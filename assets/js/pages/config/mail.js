
const btnClear = document.getElementById('btn-clear');
const addNewModal = document.getElementById('editModalTitle')

// BEGIN: initial
btnClear.addEventListener('click', function() { 
    document.getElementById('email-ip').value = ''; 
});

$(function () {
    'use strict';

    var dtMailTable = $('.mail-list-table'),
        assetPath = '../../../app-assets/';

    if ($('body').attr('data-framework') === 'laravel') {
        assetPath = $('body').attr('data-asset-path');
    }

    // datatable: group-list-table
    if (dtMailTable.length) {
        var dtMail = dtMailTable.DataTable({
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
                    width: '10%',
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
                    // 群組名稱
                    targets: 1,
                    width: '30%',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return full.invoice_id;
                    }
                },
                {
                    // 人數
                    targets: 2,
                    width: '30%',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        var $invoiceStatus = full['invoice_status']
                        return $invoiceStatus;
                    }
                },
                {
                    // 功能
                    targets: 3,
                    responsivePriority: 4,
                    width: '30%',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return "<a class='btn-view' href='" + '/html/pages/config/mail-edit.html?name=' + encodeURI('本國銀行組') + "' ><i data-feather='eye'></i></a>";
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
                '<"col-sm-12 col-md-6 d-flex justify-content-end"p>' +
                '>',
                language: {
                sLengthMenu: 'Show _MENU_',
                search: '搜尋',
                searchPlaceholder: '填入關鍵字',
                paginate: {
                    // remove previous & next text from pagination
                    previous: '&nbsp;',
                    next: '&nbsp;'
                }
            },
            // Buttons with Dropdown
            buttons: [
                {
                    text: '新增',
                    className: 'btn btn-outline-primary ms-2 btn-addNew',
                    action: function (e, dt, button, config) {
                        setEditModalType('add');
                        showModal(addNewModal);
                    }
                },
                {
                    text: '刪除',
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

                // 更改顯示頁數 select 標題
                Array.from(document.getElementsByClassName('dataTables_length')).map(node => {
                    const content = node.getElementsByTagName('label')[0].childNodes[0];
                    
                
                })
            },
            drawCallback: function () {
                $(document).find('[data-bs-toggle="tooltip"]').tooltip();

                // 按鈕套用 Modal 屬性
                document.getElementsByClassName('btn-addNew')[0].setAttribute('data-bs-toggle', 'modal');
                document.getElementsByClassName('btn-addNew')[0].setAttribute('data-bs-target', '#addNewModal');
                Array.from(document.getElementsByClassName('btn-edit')).map(btn => { 
                    btn.setAttribute('data-bs-toggle', 'modal');
                    btn.setAttribute('data-bs-target', '#addNewModal');
                })

                // [欄位]-[編輯] 按鈕行為
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

function setEditModalType(type) {
    addNewModal.getElementsByTagName('h5')[0].textContent = type === 'add' ? '新增' : '編輯';
    addNewModal.querySelector('button[type="submit"]').textContent = type === 'add' ? '確定' : '儲存變更';
}
/**
 * 由 ajax 獲得卡片資料
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
                name: '本國銀行組'},
            {number: 4,
                name: '地方金融組'},
            {number: 5,
                name: '證券票券組'},
            {number: 3,
                name: '本國銀行組'},
            {number: 3,
                name: '本國銀行組'},
        ])
    })
}

/**
 * 送出 新增資料
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
                name: '本國銀行組'},
            {number: 4,
                name: '地方金融組'},
            {number: 5,
                name: '證券票券組'},
            {number: 3,
                name: '本國銀行組'},
            {number: 3,
                name: '本國銀行組'},
        ])
    })
}

// checkbox 全選/全不選
$('.select-all').click(function() {
    $("input[type='checkbox']").each(function() {
        $(this).prop("checked", $('.select-all').prop("checked"));
    })
})


/**
 * 獲得所有選取狀態的 checkbox 的 index
 */
function getCheckedIndexs() {
    const checkedIndexs = [];
    $(".checkbox").map((index, element) => {
        if ( element.checked ) { checkedIndexs.push(index) }
    })
    return checkedIndexs;
} 

/**
 * 獲得所有選取的資料
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


/** [ 棄 用 ]
 * 重新渲染卡片群
 * @param className 父層的 class 名稱
 */
// function reDrawCards(className, source) {
//     const container = document.getElementsByClassName(className)[0];
//     container.textContent = '';
//     source.map((data, index) => {
//         const sizeDiv = document.createElement("div");
//         const card = document.createElement("div");
//         const cardBody = document.createElement("div");
//         const linkGroup = document.createElement("div");
//         const cardCount = document.createElement("p");
//         const No = document.createElement("span");
//         const cardName = document.createElement("h4");
//         const linkEdit = document.createElement("a");
//         const btnPw = document.createElement("button");
//         const countText1 = document.createTextNode("共");
//         const countText2= document.createTextNode("人");
//         const linkEditText= document.createTextNode("編輯 告警信件");
//         const btnPwText= document.createTextNode("設定 信件密碼");
//         sizeDiv.classList.add('col-md-6', 'col-lg-4');card.classList.add('card', 'mb-20');cardBody.classList.add('card-body');cardCount.classList.add('card-title');cardName.classList.add('card-subtitle', 'mb-20');linkGroup.classList.add('d-flex', 'flex-row');linkEdit.classList.add('card-link', 'mr-10');btnPw.classList.add('card-link', 'btn', 'ml-20');
//         linkEdit.setAttribute('href', '/html/pages/config/mail-edit.html?name=' + encodeURI(data.name));
//         btnPw.setAttribute('id', `btn-password-${index}`);btnPw.setAttribute('data-bs-backdrop', 'false');btnPw.setAttribute('data-bs-toggle', 'modal');btnPw.setAttribute('data-bs-target', '#editModal');
//         No.innerText = data.number;
//         cardName.innerText = data.name;
//         cardCount.append(countText1);cardCount.appendChild(No);cardCount.append(countText2);
//         linkEdit.append(linkEditText);btnPw.append(btnPwText);
//         cardBody.appendChild(cardCount);cardBody.appendChild(cardName);linkGroup.appendChild(linkEdit);linkGroup.appendChild(btnPw);cardBody.appendChild(linkGroup);
//         card.appendChild(cardBody);sizeDiv.appendChild(card);
//         container.appendChild(sizeDiv);
//         document.getElementById(`btn-password-${index}`).addEventListener('click', function() {
//             document.getElementById('editModalTitle').textContent = data.name;
//         })
//     })
// }