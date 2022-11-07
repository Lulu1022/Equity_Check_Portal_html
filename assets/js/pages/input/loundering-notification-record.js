
// BEGIN: Initial
Array.from(document.getElementsByName("relator-isValidable")).map(node => {
    node.addEventListener('click', function() {
        if (node.id === 'change-sell') {
            document.getElementById('group-pledgee').classList.add('d-none');
            document.getElementById('group-sell').classList.remove('d-none');
        } else {
            document.getElementById('group-sell').classList.add('d-none');
            document.getElementById('group-pledgee').classList.remove('d-none');
        }
    })
})

$(function () {
    'use strict';

    var dtReportTable = $('.report-list-table'),
        assetPath = '../../../assets/';

    if ($('body').attr('data-framework') === 'laravel') {
        assetPath = $('body').attr('data-asset-path');
    }

    // datatable: input-list-table
    if (dtReportTable.length) {
        var dtReport = dtReportTable.DataTable({
            ajax: '/mock-data/invoice-list.json', // JSON file to add data
            autoWidth: false,
            search: false,
            columns: [
                // columns according to JSON
                { data: 'responsive_id' },
                { data: 'responsive_id' },
                { data: 'invoice_id' },
                { data: 'client_name' },
                { data: 'total' },
                { data: 'issued_date' },
            ],
            columnDefs: [
                {
                    // Actions
                    targets: 0,
                    width: '4%',
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
                    // 申報類別
                    targets: 1,
                    width: '19%',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return full['invoice_id'];
                    }
                },
                {
                    // 身分證字號
                    targets: 2,
                    width: '19%',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        var $invoiceStatus = full['invoice_status']
                        return $invoiceStatus;
                    }
                },
                {
                    // 申報證券商
                    targets: 3,
                    responsivePriority: 4,
                    width: '19%',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return full['client_name'];
                    }
                },
                {
                    // 股票代號
                    targets: 4,
                    width: '19%',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        var $total = full['total'];
                        return '<span class="d-none">' + $total + '</span>$' + $total;
                    }
                },
                {
                    // 申報日期
                    targets: 5,
                    width: '19%',
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
                }
            ],
            order: [[1, 'desc']],
            dom:
                '<" d-flex flex-row justify-content-between align-items-center m-1"' +
                '<"col-lg-6 d-flex align-items-center"<"mr-20"l>f>' +
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

                Array.from(document.getElementsByClassName('dataTables_length')).map(node => {
                    node.getElementsByTagName('label')[0].childNodes[0].data = '顯示 '})
        
                setButtonModalFunc(document.getElementsByClassName('btn-delete')[0], 'reportDeleteModal')
            },
            drawCallback: function () {
                $(document).find('[data-bs-toggle="tooltip"]').tooltip();
            }
        });
    }
});


// END: Initial

/**
 * 給 <button> 加裝開啟 Modal 的屬性
 * @param node HTMLElement 
 * @param modalId string Modfal 的 id
 */
function setButtonModalFunc(node, modalId) {
    node.setAttribute('data-bs-toggle', 'modal');
    node.setAttribute('data-bs-target', `#${modalId}`);
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