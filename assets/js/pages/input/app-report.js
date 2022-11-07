
$(function () {
    'use strict';

    var dtInvoiceTable = $('.input-list-table'),
        assetPath = '../../../assets/';

    if ($('body').attr('data-framework') === 'laravel') {
        assetPath = $('body').attr('data-asset-path');
    }

    // datatable: input-list-table
    if (dtInvoiceTable.length) {
        var dtInvoice = dtInvoiceTable.DataTable({
            ajax: '/mock-data/invoice-list.json', // JSON file to add data
            autoWidth: false,
            search: false,
            columns: [
                // columns according to JSON
                { data: 'responsive_id' },
                { data: 'responsive_id' },
                { data: 'invoice_id' },
                { data: '000' },
                { data: 'client_name' },
                { data: 'total' },
                { data: 'balance' },
                { data: 'issued_date' },
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
                    // Invoice ID
                    targets: 1,
                    width: '15%',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        var $invoiceId = full['invoice_id'];
                        // Creates full output for row
                        var $rowOutput = '<a class="fw-bold" href="' + '"> #' + $invoiceId + '</a>';
                        return $rowOutput;
                    }
                },
                {
                    // Invoice status
                    targets: 2,
                    width: '15%',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        var $invoiceStatus = full['invoice_status']
                        return $invoiceStatus;
                    }
                },
                {
                    // Client name and Service
                    targets: 3,
                    responsivePriority: 4,
                    width: '20%',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        var $name = full['client_name'],
                            $email = full['email'],
                            $image = full['avatar'],
                            stateNum = Math.floor(Math.random() * 6),
                            states = ['success', 'danger', 'warning', 'info', 'primary', 'secondary'],
                            $state = states[stateNum],
                            $name = full['client_name'],
                            $initials = $name.match(/\b\w/g) || [];
                        $initials = (($initials.shift() || '') + ($initials.pop() || '')).toUpperCase();
                        if ($image) {
                            // For Avatar image
                            var $output =
                                '';
                        } else {
                            // For Avatar badge
                            $output = '<div class="avatar-content">' + $initials + '</div>';
                        }
                        // Creates full output for row
                        var colorClass = $image === '' ? ' bg-light-' + $state + ' ' : ' ';

                        var $rowOutput =
                            '<div class="d-flex justify-content-left align-items-center">' +
                            '<div class="avatar-wrapper">' +
                            '<div class="avatar' +
                            colorClass +
                            'me-50">' +
                            $output +
                            '</div>' +
                            '</div>' +
                            '<div class="d-flex flex-column">' +
                            '<h6 class="user-name text-truncate mb-0">' +
                            $name +
                            '</h6>' +
                            '<small class="text-truncate text-muted">' +
                            $email +
                            '</small>' +
                            '</div>' +
                            '</div>';
                        return $rowOutput;
                    }
                },
                {
                    // Total Invoice Amount
                    targets: 4,
                    width: '15%',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        var $total = full['total'];
                        return '<span class="d-none">' + $total + '</span>$' + $total;
                    }
                },
                {
                    // Due Date
                    targets: 5,
                    width: '15%',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        var $dueDate = new Date(full['due_date']);
                        // Creates full output for row
                        var $rowOutput =
                            '<span class="d-none">' +
                            moment($dueDate).format('YYYYMMDD') +
                            '</span>' +
                            moment($dueDate).format('DD MMM YYYY');
                        $dueDate;
                        return $rowOutput;
                    }
                },
                {
                    // Client Balance/Status
                    targets: 6,
                    width: '15%',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        var $balance = full['balance'];
                        if ($balance === 0) {
                            var $badge_class = 'badge-light-success';
                            return '<span class="badge rounded-pill ' + $badge_class + '" text-capitalized> Paid </span>';
                        } else {
                            return '<span class="d-none">' + $balance + '</span>' + $balance;
                        }
                    }
                },
            ],
            order: [[1, 'desc']],
            dom:
                '<"row d-flex justify-content-between align-items-center m-1"' +
                '<"col-lg-12 d-flex align-items-center justify-content-end"<""B>>' +
                '<"col-lg-12 d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap pe-lg-1 p-0">' +
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
                    text: '覆核',
                    className: 'btn btn-primary ms-2',
                    action: function (e, dt, button, config) {
                        getCheckedData(dtInvoiceTable);
                    }
                },
                {
                    text: '退回',
                    className: 'btn btn-outline-secondary ms-1',
                    action: function (e, dt, button, config) {
                        getCheckedData(dtInvoiceTable);
                    }
                }
            ],
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
    console.log('aa-', checkedData)
    return checkedData;
}
