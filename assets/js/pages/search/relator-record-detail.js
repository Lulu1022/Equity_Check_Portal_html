// BEGIN: Initial

$(function () {
    'use strict';
    var dtAccountTable = $('.account-list-table'),
        dtRelatorTable = $('.relator-list-table'),
        assetPath = '../../../assets/';

    if ($('body').attr('data-framework') === 'laravel') {
        assetPath = $('body').attr('data-asset-path');
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
                    // 關係人群組
                    targets: 0,
                    width: '50px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return '1'
                    }
                },
                {
                    // 聯絡人(共同代表人)
                    targets: 1,
                    width: '46px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return full['invoice_id'];
                    }
                },
                {
                    // 通報原因 (A)=(C)+(D)+(E)+(F)+(G)
                    targets: 2,
                    width: '42px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        var $invoiceStatus = full['invoice_status']
                        return $invoiceStatus;
                    }
                },
                {
                    // 持股餘額合計 (A)=(C)+(D)+(E)+ (F)+(G)
                    targets: 3,
                    width: '42px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        var $invoiceStatus = full['invoice_status']
                        return $invoiceStatus;
                    }
                },
                {
                    // 持股餘額比率 (B)=(A)/(H) (B)=(A)/(I)
                    targets: 4,
                    responsivePriority: 4,
                    width: '230px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return full['client_name'];
                    }
                },
                {
                    // 保管劃撥 帳戶餘額 (C)
                    targets: 5,
                    width: '100px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        var $total = full['total'];
                        return '<span class="d-none">' + $total + '</span>$' + $total;
                    }
                },
                {
                    // 擔保品 餘額 (D)
                    targets: 6,
                    width: '130px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return '公司名稱';
                    }
                },
                {
                    // 設質餘額 (E)
                    targets: 7,
                    width: '70px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return '12345';
                    }
                },
                {
                    // 登錄餘額 (F)
                    targets: 8,
                    width: '70px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return '共同代表人';
                    }
                },
                {
                    // 現股餘額 
                    targets: 9,
                    width: '70px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return '1111111';
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

    // datatable: right-list-table
    if (dtAccountTable.length) {
        var dtAccount = dtAccountTable.DataTable({
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
                    // 關係人群組
                    targets: 0,
                    width: '50px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return '1'
                    }
                },
                {
                    // 聯絡人(共同代表人)
                    targets: 1,
                    width: '46px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return full['invoice_id'];
                    }
                },
                {
                    // 通報原因 (A)=(C)+(D)+(E)+(F)+(G)
                    targets: 2,
                    width: '42px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        var $invoiceStatus = full['invoice_status']
                        return $invoiceStatus;
                    }
                },
                {
                    // 持股餘額合計 (A)=(C)+(D)+(E)+ (F)+(G)
                    targets: 3,
                    width: '42px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        var $invoiceStatus = full['invoice_status']
                        return $invoiceStatus;
                    }
                },
                {
                    // 持股餘額比率 (B)=(A)/(H) (B)=(A)/(I)
                    targets: 4,
                    responsivePriority: 4,
                    width: '230px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return full['client_name'];
                    }
                },
                {
                    // 保管劃撥 帳戶餘額 (C)
                    targets: 5,
                    width: '100px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        var $total = full['total'];
                        return '<span class="d-none">' + $total + '</span>$' + $total;
                    }
                },
                {
                    // 擔保品 餘額 (D)
                    targets: 6,
                    width: '130px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return '公司名稱';
                    }
                },
                {
                    // 設質餘額 (E)
                    targets: 7,
                    width: '70px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return '12345';
                    }
                },
                {
                    // 登錄餘額 (F)
                    targets: 8,
                    width: '70px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return '共同代表人';
                    }
                },
                {
                    // 現股餘額 
                    targets: 9,
                    width: '70px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return '1111111';
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

// END: Initial
