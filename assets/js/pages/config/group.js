
const btnAddModelComfirm = document.getElementById('add-model-comfirm');
const addNewModal = document.getElementById('addNewModal');

// BEGIN: initial
// btnAddModelComfirm.addEventListener('click', function() { postAddNewGroup().then((data) => $('.group-list-table').DataTable().draw()) })

(function (window, document, $) {
    'use strict';
    var select = $('.select2')
    select.each(function () {
        var $this = $(this);
        $this.wrap('<div class="position-relative"></div>');
        $this.select2({
        // the following code is used to disable x-scrollbar when click in select input and
        // take 100% width in responsive also
        dropdownAutoWidth: true,
        width: '100%',
        dropdownParent: $this.parent()
        });
    });
})

$(function () {
    'use strict';

    var dtGroupTable = $('.group-list-table'),
        assetPath = '../../../app-assets/';

    if ($('body').attr('data-framework') === 'laravel') {
        assetPath = $('body').attr('data-asset-path');
    }

    // datatable: group-list-table
    if (dtGroupTable.length) {
        var dtGroup = dtGroupTable.DataTable({
            ajax: '/mock-data/invoice-list.json', // JSON file to add data
            autoWidth: false,
            search: false,
            pageLength : 20,
            lengthMenu: [5, 10, 20, 50, 100],
            columns: [
                // columns according to JSON
                { data: 'responsive_id' },
                { data: 'responsive_id' },
                { data: 'invoice_id' },
                { data: 'client_name' },
            ],
            columnDefs: [
                {
                    // Actions
                    targets: 0,
                    width: '12%',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return (
                            '<label class="d-flex mt-checkbox mt-checkbox-single mt-checkbox-outline">' +
                                '<input type="checkbox" class="checkbox group-checkable" style="width:18px;height:18px" data-set="#sample_1 .checkboxes">' +
                                '<span></span>' +
                            '</label>'
                        )
                    }
                },
                {
                    // ??????
                    targets: 1,
                    width: '17%',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return '#123456789012';
                    }
                },
                {
                    // ????????????
                    targets: 2,
                    width: '17%',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return full.invoice_id;
                    }
                },
                {
                    // ????????????
                    targets: 3,
                    width: '17%',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        var $invoiceStatus = full['invoice_status']
                        return $invoiceStatus;
                    }
                },
                {
                    // ??????
                    targets: 4,
                    width: '17%',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return "<a class='btn-edit' id='edit-" + meta.row + "'><i data-feather='edit'></i></a>";
                    }
                },
                {
                    // ????????????
                    targets: 5,
                    responsivePriority: 4,
                    width: '17%',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return  ' <button type="button" id="btn-delete' + meta.row  +'" class="btn btn-outline-primary list-edit text-nowrap" data-bs-dismiss="modal" ><a class="btn-view" href="/html/pages/config/group-datail.html?name=' + encodeURI('???????????????') + '" >??????</a></button>'
                    }
                }
            ],
            order: [[1, 'desc']],
            dom:
                '<" d-flex flex-row justify-content-between align-items-center m-1"' +
                '<"col-lg-6 d-flex align-items-center"l<"ml-20"f>>' +
                '<"col-lg-6 d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap pe-lg-1 p-0" <" ms-sm-2"B>>' +
                '>t' +
                '<"d-flex justify-content-between mx-2 row"' +
                '<"col-sm-12 col-md-6"i>' +
                '<"col-sm-12 col-md-6"p>' +
                '>',
                language: {
                sLengthMenu: 'Show _MENU_',
                search: '??????',
                searchPlaceholder: '???????????????',
                paginate: {
                    // remove previous & next text from pagination
                    previous: '&nbsp;',
                    next: '&nbsp;'
                }
            },
            // Buttons with Dropdown
            buttons: [
                {
                    text: '??????',
                    className: 'btn btn-outline-primary ms-2 btn-addNew',
                    action: function (e, dt, button, config) {
                        setEditModalType('add');
                        showModal(addNewModal);
                    }
                },
                {
                    text: '??????',
                    className: 'btn btn-outline-primary ms-1 btn-deledte',
                    action: function (e, dt, button, config) {
                        deleteCheckedRows(editForm).then(() => dtAccountTable.DataTable().draw())
                    }
                }
            ],
            // For responsive popup
            responsive: {
                details: false
            },
            initComplete: function () {
                $(document).find('[data-bs-toggle="tooltip"]').tooltip();

                // ?????????????????? select ??????
                Array.from(document.getElementsByClassName('dataTables_length')).map(node => {
                    node.getElementsByTagName('label')[0].childNodes[0].data = '?????? '})
            },
            drawCallback: function () {
                $(document).find('[data-bs-toggle="tooltip"]').tooltip();

                // ???????????? Modal ??????
                document.getElementsByClassName('btn-addNew')[0].setAttribute('data-bs-toggle', 'modal');
                document.getElementsByClassName('btn-addNew')[0].setAttribute('data-bs-target', '#addNewModal');
                Array.from(document.getElementsByClassName('btn-edit')).map(btn => { 
                    btn.setAttribute('data-bs-toggle', 'modal');
                    btn.setAttribute('data-bs-target', '#addNewModal');
                })

                // [??????]-[??????] ????????????
                const editBtns = Array.from(document.getElementsByClassName('btn-edit'));
                editBtns.map((btn, index) => {
                    btn.addEventListener('click', function(e) {
                        setEditModalType('edit');
                        getCaseData()
                        .then((data) => {
                            setEditFormValues(data);
                            showModal(addNewModal);
                        })

                    })
                })

            }
        });
    }
});
// END: initial


/**
 * ?????? Modal
 * @param modal HTMLElement
 */ 
function showModal(modal) {
    modal.classList.add('show');
    modal.style.display = 'block';
}

function setEditModalType(type) {
    addNewModal.getElementsByTagName('h5')[0].textContent = type === 'add' ? '??????' : '??????';
    addNewModal.querySelector('button[type="submit"]').textContent = type === 'add' ? '??????' : '????????????';
}

/**
 * ??? ajax ??????????????????
 */
function getCardsSource() {
    return new Promise((resolve, reject) => {
        // const id = 'XXX';
        //     $.ajax({
        //         "type": "GET",
        //         "url": '#', // TODO: 
        //         "data": JSON.stringify(id),
        //         "dataType": 'json',
        //         "success": function (data, status, xhr) {
        //             resolve(data);
        //             console.log(data);
        //         }
        //         ,
        //         "error": function (xhr, error, thrown) {
        //             reject(error)
        //             console.log('Error in Operation', error);
        //         }
        // })

        // Mock value
        resolve([
            {number: 3,
                name: '???????????????'},
            {number: 4,
                name: '???????????????'},
            {number: 5,
                name: '???????????????'},
            {number: 3,
                name: '???????????????'},
            {number: 3,
                name: '???????????????'},
        ])
    })
}

/**
 * ?????? ????????????
 */
function postAddNewGroup() {
    return new Promise((resolve, reject) => {
        // const newName = document.getElementById('group-name');
        //     $.ajax({
        //         "type": "POST",
        //         "url": '#', // TODO: 
        //         "data": JSON.stringify(newName),
        //         "dataType": 'json',
        //         "success": function (data, status, xhr) {
        //             resolve(data);
        //             console.log(data);
        //         }
        //         ,
        //         "error": function (xhr, error, thrown) {
        //             reject(error)
        //             console.log('Error in Operation', error);
        //         }
        // })
        resolve([
            {number: 3,
                name: '???????????????'},
            {number: 4,
                name: '???????????????'},
            {number: 5,
                name: '???????????????'},
            {number: 3,
                name: '???????????????'},
            {number: 3,
                name: '???????????????'},
        ])
    })
}

// checkbox ??????/?????????
$('.select-all').click(function() {
    console.log('aa-checkbox')
    $("input[type='checkbox']").each(function() {
        $(this).prop("checked", $('.select-all').prop("checked"));
    })
})

/**
 * ??????????????????????????? checkbox ??? index
 */
function getCheckedIndexs() {
    const checkedIndexs = [];
    $(".checkbox").map((index, element) => {
        if ( element.checked ) { checkedIndexs.push(index) }
    })
    return checkedIndexs;
} 

/**
 * ???????????????????????????
 */
function getCheckedData(dataTable) {
    const checkedData = [];
    getCheckedIndexs().map(checkedIndex => {
        dataTable.DataTable().rows().data().map(function(e, index) {
            if ( checkedIndex === index ) {
                checkedData.push(e);
            }
        })
    })
    return checkedData;
}

/** [ ??? ??? ]
 *  ?????????????????????
 * @param className ????????? class ??????
 */
// function reDrawCards(className, source) {
//     const container = document.getElementsByClassName(className)[0];
//     container.textContent = '';
//     source.map((data, index) => {
//         const sizeDiv = document.createElement("div");
//         const card = document.createElement("div");
//         const cardBody = document.createElement("div");
//         const cardCount = document.createElement("p");
//         const No = document.createElement("span");
//         const cardName = document.createElement("h4");
//         const link = document.createElement("a");
//         const countText1 = document.createTextNode("???");
//         const countText2= document.createTextNode("???");
//         const linkText2= document.createTextNode("????????????");
//         sizeDiv.classList.add('col-md-6', 'col-lg-4');card.classList.add('card', 'mb-4');cardBody.classList.add('card-body');cardCount.classList.add('card-title', 'mb-20');cardName.classList.add('card-subtitle', 'mb-20');link.classList.add('card-link');
//         link.setAttribute('href', '/html/pages/config/group-datail.html?name=' + encodeURI(data.name));
//         No.innerText = data.number;
//         cardName.innerText = data.name;
//         cardCount.append(countText1);cardCount.appendChild(No);cardCount.append(countText2);
//         link.append(linkText2);
//         cardBody.appendChild(cardCount);cardBody.appendChild(cardName);cardBody.appendChild(link);
//         card.appendChild(cardBody);sizeDiv.appendChild(card);
//         container.appendChild(sizeDiv);
//     })
// }