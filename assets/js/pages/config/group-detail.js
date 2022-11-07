
const title = document.getElementById('header-title');
const breadcrumb = document.getElementById('breadcrumb');
const btnSend = document.getElementById('btn-send');
// BEGIN: Initial
title.textContent = getUrlParam('name');
breadcrumb.textContent = getUrlParam('name');
btnSend.addEventListener('click', function() {
    postData(getCheckedData($('.group-list-table'))).then(() => $('.group-list-table').DataTable().draw())
})
// END: Initial


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
            columns: [
                // columns according to JSON
                // { data: 'responsive_id' },
                { data: 'invoice_id' },
                { data: 'client_name' },
                { data: 'total' },
                { data: 'balance' },
                { data: 'issued_date' },
                // { data: 'invoice_status' },
            ],
            columnDefs: [
                {
                    // 姓名
                    targets: 0,
                    width: '60px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return data;
                    }
                },
                {
                    // 角色
                    targets: 1,
                    width: '60px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return data;
                    }
                },
                {
                    // 授權
                    targets: 2,
                    width: '60px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return data;
                    }
                },
                {
                    // 群組
                    targets: 3,
                    responsivePriority: 4,
                    width: '140px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return data;
                    }
                },
                {
                    // 告警信件
                    targets: 4,
                    width: '73px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return (
                            '<label class="d-flex mt-checkbox mt-checkbox-single mt-checkbox-outline">' +
                                '<input type="checkbox" class="checkbox group-checkable" style="width:18px;height:18px" data-set="#sample_1 .checkboxes">' +
                                '<span></span>' +
                            '</label>'
                        )
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
                search: '搜尋',
                searchPlaceholder: '填入關鍵字',
                paginate: {
                    // remove previous & next text from pagination
                    previous: '&nbsp;',
                    next: '&nbsp;'
                }
            },
            // Buttons with Dropdown
            buttons: [],
            // For responsive popup
            responsive: {
                details: false
            },
            initComplete: function () {
                $(document).find('[data-bs-toggle="tooltip"]').tooltip();
            },
            drawCallback: function () {
                $(document).find('[data-bs-toggle="tooltip"]').tooltip();
            }
        });
    }
});

// select/unselect all
$('.select-all').click(function() {
    $("input[type='checkbox']").each(function() {
        $(this).prop("checked", $('.select-all').prop("checked"));
    })
})

// get array of index of checked checkboxs
function getCheckedIndexs() {
    const checkedIndexs = [];
     $(".checkbox").map((index, element) => {
        if ( element.checked ) { checkedIndexs.push(index) }
    })
    return checkedIndexs;
} 

// get a array of checked row data in dataTable
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



/**
 * 用參數名稱獲得 url 參數值
 * @param paramName 參數名稱
 * @returns string
 */
function getUrlParam(paramName) { 
    const url = decodeURI(location.href);
    const params = url.split('?')[1].split('&');
    return url.indexOf('?') !== -1 
            ? params.find(param => new RegExp(`${paramName}`).test(param)).split('=')[1] 
            : '-';
}

function postData(data) {
    console.log('aa-', data)
    return new Promise((resolve, reject) => {
        $.ajax({
            "type": "POST",
            "url": '#', // TODO: 
            "dataType": 'json',
            "data": JSON.stringify(data),
            "success": function (data, status, xhr) {
                resolve(data);
                console.log(data);
            }
            ,
            "error": function (xhr, error, thrown) {
                reject(error)
                console.log('Error in Operation', error);
            }
    })
    });
}

function getCheckedIndexs() {
    const checkedIndexs = [];
     $(".checkbox").map((index, element) => {
        if ( element.checked ) { checkedIndexs.push(index) }
    })
    return checkedIndexs;
} 

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
