
const dataTableRadios =  Array.from(document.getElementsByName('search-isValidable'));
// BEGIN: Initial
// 用 radio select 切換 databable
dataTableRadios.forEach(node=> {
    node.addEventListener('click', function(event) {
        const className = event.target.value;
        Array.from(document.getElementsByClassName('table')).forEach(node => node.parentNode.parentNode.classList.add('d-none'));
        document.getElementsByClassName(className)[0].parentNode.parentNode.classList.remove('d-none');
    })
})

$(function () {
    'use strict';
    var dtRightTable = $('.right-list-table'),
        dtRelatorTable = $('.relator-list-table'),
        dtGroupTable = $('.group-list-table'),
        assetPath = '../../../assets/';

    if ($('body').attr('data-framework') === 'laravel') {
        assetPath = $('body').attr('data-asset-path');
    }

    // datatable: right-list-table
    if (dtRightTable.length) {
        var dtRight = dtRightTable.DataTable({
            ajax: '/mock-data/invoice-list.json', // JSON file to add data
            autoWidth: false,
            search: false,
            columns: [
                // columns according to JSON
                { data: '' },
                { data: 'responsive_id' },
                { data: 'invoice_id' },
                { data: 'client_name' },
                { data: 'total' },
                { data: 'issued_date' },
            ],
            columnDefs: [
                {
                    // 項目
                    targets: 0,
                    width: '50px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return '1'
                    }
                },
                {
                    // 通報日期
                    targets: 1,
                    width: '46px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return full['invoice_id'];
                    }
                },
                {
                    // 通報原因
                    targets: 2,
                    width: '42px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        var $invoiceStatus = full['invoice_status']
                        return $invoiceStatus;
                    }
                },
                {
                    // 填表日期
                    targets: 3,
                    responsivePriority: 4,
                    width: '230px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return full['client_name'];
                    }
                },
                {
                    // 公司代號
                    targets: 4,
                    width: '100px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        var $total = full['total'];
                        return '<span class="d-none">' + $total + '</span>$' + $total;
                    }
                },
                {
                    // 公司名稱
                    targets: 5,
                    width: '130px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return '公司名稱';
                    }
                },
                {
                    // 群組編號
                    targets: 6,
                    width: '70px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return '12345';
                    }
                },
                {
                    // 共同代表人
                    targets: 7,
                    width: '70px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return '共同代表人';
                    }
                },
                {
                    // 表決權股份總數（股）
                    targets: 8,
                    width: '70px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return '1111111';
                    }
                },
                {
                    // 群組持股數（股）
                    targets: 9,
                    width: '70px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return '1111111';
                    }
                },
                {
                    // 群組持股比率（％）
                    targets: 10,
                    width: '70px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return '50%';
                    }
                },
                {
                    // 詳細資訊
                    targets: 11,
                    width: '70px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return  `<button type="button" id="btn-view" class="btn btn-outline-primary text-nowrap">
                                    <a href="/html/pages/search/relator-record-detail.html?name=股權檢核通報紀錄查詢">查看</a></button>`;
                    }
                },
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
            buttons: [
                {
                    text: '刪除',
                    className: 'btn-delete btn btn-outline-primary ms-1',
                    action: function (e, dt, button, config) {
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
                    node.getElementsByTagName('label')[0].childNodes[0].data = '顯示 '})
            },
            drawCallback: function () {
                $(document).find('[data-bs-toggle="tooltip"]').tooltip();
            }
        });
    }

    // datatable: relator-list-table
    if (dtRelatorTable.length) {
        var dtRelator = dtRelatorTable.DataTable({
            ajax: '/mock-data/invoice-list.json', // JSON file to add data
            autoWidth: false,
            search: false,
            columns: [
                // columns according to JSON
                { data: '' },
                { data: 'responsive_id' },
                { data: 'invoice_id' },
                { data: 'client_name' },
                { data: 'total' },
                { data: 'issued_date' },
            ],
            columnDefs: [
                {
                    // 項目
                    targets: 0,
                    width: '50px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return '1'
                    }
                },
                {
                    // 通報日期
                    targets: 1,
                    width: '46px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return full['invoice_id'];
                    }
                },
                {
                    // 通報原因
                    targets: 2,
                    width: '42px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        var $invoiceStatus = full['invoice_status']
                        return $invoiceStatus;
                    }
                },
                {
                    // 填表日期
                    targets: 3,
                    responsivePriority: 4,
                    width: '230px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return full['client_name'];
                    }
                },
                {
                    // 公司代號
                    targets: 4,
                    width: '100px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        var $total = full['total'];
                        return '<span class="d-none">' + $total + '</span>$' + $total;
                    }
                },
                {
                    // 公司名稱
                    targets: 5,
                    width: '130px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return '公司名稱';
                    }
                },
                {
                    // 群組編號
                    targets: 6,
                    width: '70px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return '12345';
                    }
                },
                {
                    // 共同代表人
                    targets: 7,
                    width: '70px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return '共同代表人';
                    }
                },
                {
                    // 表決權股份總數（股）
                    targets: 8,
                    width: '70px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return '1111111';
                    }
                },
                {
                    // 群組持股數（股）
                    targets: 9,
                    width: '70px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return '1111111';
                    }
                },
                {
                    // 群組持股比率（％）
                    targets: 10,
                    width: '70px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return '50%';
                    }
                },
                {
                    // 備註說明
                    targets: 11,
                    width: '120px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return '備註說明備註說明備註說明備註說明備註說明備註說明備註說明';
                    }
                },
                {
                    // 詳細資訊
                    targets: 12,
                    width: '70px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return  `<button type="button" id="btn-view" class="btn btn-outline-primary text-nowrap">
                        <a href="/html/pages/search/relator-record-detail.html?name=同一關係人來函申報紀錄查詢">查看</a></button>`;
                    }
                },
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
            buttons: [
                {
                    text: '刪除',
                    className: 'btn-delete btn btn-outline-primary ms-1',
                    action: function (e, dt, button, config) {
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
                    node.getElementsByTagName('label')[0].childNodes[0].data = '顯示 '})
            },
            drawCallback: function () {
                $(document).find('[data-bs-toggle="tooltip"]').tooltip();
            }
        });
    }

    // datatable: group-list-table
    if (dtGroupTable.length) {
        var dtGroup = dtGroupTable.DataTable({
            ajax: '/mock-data/invoice-list.json', // JSON file to add data
            autoWidth: false,
            search: false,
            columns: [
                // columns according to JSON
                { data: '' },
                { data: 'responsive_id' },
                { data: 'invoice_id' },
                { data: 'client_name' },
                { data: 'total' },
                { data: 'issued_date' },
            ],
            columnDefs: [
                {
                    // 項目
                    targets: 0,
                    width: '50px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return '1'
                    }
                },
                {
                    // 通報日期
                    targets: 1,
                    width: '46px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return full['invoice_id'];
                    }
                },
                {
                    // 通報原因
                    targets: 2,
                    width: '42px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        var $invoiceStatus = full['invoice_status']
                        return $invoiceStatus;
                    }
                },
                {
                    // 填表日期
                    targets: 3,
                    responsivePriority: 4,
                    width: '230px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return full['client_name'];
                    }
                },
                {
                    // 公司代號
                    targets: 4,
                    width: '100px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        var $total = full['total'];
                        return '<span class="d-none">' + $total + '</span>$' + $total;
                    }
                },
                {
                    // 公司名稱
                    targets: 5,
                    width: '130px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return '公司名稱';
                    }
                },
                {
                    // 群組編號
                    targets: 6,
                    width: '70px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return '12345';
                    }
                },
                {
                    // 共同代表人
                    targets: 7,
                    width: '70px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return '共同代表人';
                    }
                },
                {
                    // 表決權股份總數（股）
                    targets: 8,
                    width: '70px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return '1111111';
                    }
                },
                {
                    // 群組持股數（股）
                    targets: 9,
                    width: '70px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return '1111111';
                    }
                },
                {
                    // 群組持股比率（％）
                    targets: 10,
                    width: '70px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return '50%';
                    }
                },
                {
                    // 填表日期
                    targets: 11,
                    width: '70px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return '填表日期';
                    }
                },
                {
                    // 詳細資訊
                    targets: 12,
                    width: '70px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return  `<button type="button" id="btn-view" class="btn btn-outline-primary text-nowrap">
                        <a href="/html/pages/search/relator-record-detail.html?name=群組查詢">查看</a></button>`;
                    }
                },
                {
                    // 是否檢核
                    targets: 13,
                    width: '70px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return  '<button type="button" id="btn-view" class="btn btn-outline-primary text-nowrap">取消檢核</button>';
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
            buttons: [
                {
                    text: '刪除',
                    className: 'btn-delete btn btn-outline-primary ms-1',
                    action: function (e, dt, button, config) {
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
                    node.getElementsByTagName('label')[0].childNodes[0].data = '顯示 '})
                
            },
            drawCallback: function () {
                $(document).find('[data-bs-toggle="tooltip"]').tooltip();
            }
        });
    }
});

// END: Initial
