const editForm = document.forms['form-edit'];
const editModal = document.getElementById('editModal');

// editModal 的 [btn]-[儲存變更]
const BtnModalEditComfirm = document.getElementById('edit-model-comfirm');
BtnModalEditComfirm.addEventListener('click', function() { postFormData(editForm).then(() => $('.account-list-table').DataTable().draw()) });

// editModal 的 [btn]-[重設密碼]
const BtnActivate = document.getElementById('btn-activate');
BtnActivate.addEventListener('click', function() { toggleBtnActivate()})

// BEGIN: Initial
getAuthorizeOptionsSource().then(data => createAuthorizeOptions(data));
getRolesOptionsSource().then(data => createOptions('user-role', data));
getGroupsOptionsSource().then(data => createOptions('user-group', data));

$(function () {
    'use strict';

    var dtAccountTable = $('.account-list-table'),
        assetPath = '../../../app-assets/';

    if ($('body').attr('data-framework') === 'laravel') {
        assetPath = $('body').attr('data-asset-path');
    }

    // datatable: account-list-table
    if (dtAccountTable.length) {
        var dtAccount = dtAccountTable.DataTable({
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
            ],
            columnDefs: [
                {
                    // Actions
                    targets: 0,
                    width: '40px',
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
                    // 姓名
                    targets: 1,
                    width: '80px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return full.invoice_id;
                    }
                },
                {
                    // 角色
                    targets: 2,
                    width: '80px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        var $invoiceStatus = full['invoice_status']
                        return $invoiceStatus;
                    }
                },
                {
                    // 授權
                    targets: 3,
                    responsivePriority: 4,
                    width: '80px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        var $invoiceStatus = ['元大銀行', '國泰銀行', '合庫金控', '元大銀行', '國泰銀行', '合庫金控', '國泰銀行', '合庫金控', '元大銀行'];
                        let labelGroup = '<div class="table-label-container d-flex p-10">'
                        $invoiceStatus.forEach((item, index) => {
                            labelGroup = labelGroup + '<div class="table-label mr-20">' + item + '</div>';
                        })
                        return labelGroup + '</div>';
                    }
                },
                {
                    // 群組
                    targets: 4,
                    width: '120px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return data;
                    }
                },
                {
                    // 告警信件
                    targets: 5,
                    width: '80px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return data ? "<i data-feather='check'></i>" : '';
                    }
                },
                {
                    // 編輯
                    targets: 6,
                    width: '98px',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return "<a class='btn-edit' id='edit-" + meta.row + "'><i data-feather='edit'></i></a>";
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
                    text: '新增',
                    className: 'btn btn-outline-primary ms-2 btn-addNew',
                    action: function (e, dt, button, config) {
                        setEditModalType('add');
                        showModal(editModal);
                    }
                },
                {
                    text: '刪除',
                    className: 'btn btn-outline-primary ms-1 btn-deledte',
                    action: function (e, dt, button, config) {
                        deleteCheckedRows(editForm).then(() => dtAccountTable.DataTable().draw())
                    }
                },
                {
                    text: '帳號清查',
                    className: 'btn btn-outline-primary ms-1',
                    action: function (e, dt, button, config) {
                        getCheckedData(dtAccountTable);
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

                // 按鈕套用 Modal 屬性
                document.getElementsByClassName('btn-addNew')[0].setAttribute('data-bs-toggle', 'modal');
                document.getElementsByClassName('btn-addNew')[0].setAttribute('data-bs-target', '#editModal');
                Array.from(document.getElementsByClassName('btn-edit')).map(btn => { 
                    btn.setAttribute('data-bs-toggle', 'modal');
                    btn.setAttribute('data-bs-target', '#editModal');
                })

                // [欄位]-[編輯] 按鈕行為
                const editBtns = Array.from(document.getElementsByClassName('btn-edit'));
                editBtns.map((btn, index) => {
                    btn.addEventListener('click', function(e) {
                        setEditModalType('edit');
                        getCaseData()
                        .then((data) => {
                            setEditFormValues(data);
                            showModal(editModal);
                        })
                        console.log('aa-inedex', index)

                    })
                })

            }
        });
    }
});
// END: Initial

/** 
 * checkbox 全選/全不選
 */
$('.select-all').click(function() {
    $("input[type='checkbox']").each(function() {
        $(this).prop("checked", $('.select-all').prop("checked"));
    })
})

/**
 * 獲得所有 checkbox 狀態為 checked 的 index
 * @returns Array
 */
function getCheckedIndexs() {
    const checkedIndexs = [];
     $(".checkbox").map((index, element) => {
        if ( element.checked ) { checkedIndexs.push(index) }
    })
    return checkedIndexs;
} 

/**
 * 獲得指定 dataTable 內所有狀態為 checked 列的整筆資料
 * @param dataTable HTMLElement
 * @returns Array
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

/**
 * 打開 Modal
 * @param modal HTMLElement
 */ 
function showModal(modal) {
    modal.classList.add('show');
    modal.style.display = 'block';
}

/**
 * 設定 Modal 型態
 * @param type 'add'/'edit' 
 */
function setEditModalType(type) {
    const title = document.getElementById('editModalTitle');
    const btnSubmit = document.querySelector('button[type="submit"]');
    switch(type) {
        case 'edit': 
            title.textContent = '編輯';
            btnSubmit.textContent = '儲存變更'
            editForm.setAttribute('type', 'put'); break;
        case 'add': 
            title.textContent = '新增';
            btnSubmit.textContent = '確定'
            editForm.setAttribute('type', 'post'); break;
        default: break;
    }
}

/**
 * ajax 資料給 editForm 值
 */
function setEditFormValues(data) { 
    document.getElementById("user-name").value = data['user-name'];
    document.getElementById("user-account").value = data['user-name'];
    document.getElementById("user-role").value = data['user-name'];
    Array.from(document.getElementsByClassName("authorize-checkbox")).filter(checkbox => console.log('aa-checkbox',checkbox.value === 'on',checkbox))
    document.getElementById("user-group").value = data['user-name'];
    document.getElementById("reset-password").value = data['user-name'];
}

/** ajax獲得某項目資料 */
function getCaseData(data) {
    return new Promise((resolve, reject) => {
        $.ajax({
            "type": "GET",
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

// 傳送 datatable 刪除的資料
function deleteCheckedRows() {
    return new Promise((resolve, reject) => {
        const deletData = getCheckedData($('.account-list-table'));
        $.ajax({
            "type": "DELETE",
            "url": '#', // TODO: 
            "dataType": 'json',
            "data": JSON.stringify(deletData),
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

/**
 * 送出 form 資料
 */
function postFormData(form) {
    return new Promise((resolve, reject) => {
        const Data = {} // TODO:
        $.ajax({
            "type": "POST",
            "url": '#', // TODO: 
            "dataType": 'json',
            "data": JSON.stringify(Data),
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

/**
 * 由 ajax 獲得 [欄位]-[授權]選項
 */
function getAuthorizeOptionsSource() {
    return new Promise((resolve, reject) => {
    //     const Data = form.elements("user-account").value;
    //     $.ajax({
    //         "type": "GET",
    //         "url": '#', // TODO: 
    //         "data": JSON.stringify(Data),
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
     // Mock Value
    resolve([
        {value: 1, text: '新光銀行'},
        {value: 2, text: '國泰金控'},
        {value: 3, text: '聯邦銀行'},
        {value: 4, text: '彰化銀行'},
    ]);
    });
}

/**
 * 由 ajax 獲得 [欄位]-[授權]選項
 */
function getAuthorizeOptionsSource() {
    return new Promise((resolve, reject) => {
    //     const Data = form.elements("user-account").value;
    //     $.ajax({
    //         "type": "GET",
    //         "url": '#', // TODO: 
    //         "data": JSON.stringify(Data),
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
     // Mock Value
    resolve([
        {value: 1, text: '新光銀行'},
        {value: 2, text: '國泰金控'},
        {value: 3, text: '聯邦銀行'},
        {value: 4, text: '彰化銀行'},
    ]);
    });
}

/**
 * 生成 Authorize選項 DOM & Value
 */
function createAuthorizeOptions(source) {
    const container = document.getElementsByClassName('authorize-checkboxs')[0];
    source.map((data, index) => {
        const div = document.createElement("div");
        const input = document.createElement("input");
        const label = document.createElement("label");
        div.classList.add("form-check", "form-check-primary", "ml-10");
        input.classList.add("authorize-checkbox", "form-check-input", "input-filter");
        label.classList.add("form-check-label");
        input.setAttribute('value', data.value);input.setAttribute('type', 'checkbox');input.setAttribute('id', `bank${index}`);input.setAttribute('name', 'authorize');input.setAttribute('data-value', `bank${index}`);
        label.setAttribute('for', `bank${index}`);
        label.innerText = data.text;
        div.appendChild(input);div.appendChild(label);
        container.appendChild(div);
    })
}

/**
 * 由 ajax 獲得 [欄位]-[角色]選項
 */
function getRolesOptionsSource() {
    return new Promise((resolve, reject) => {
    //     const Data = form.elements("user-account").value;
    //     $.ajax({
    //         "type": "GET",
    //         "url": '#', // TODO: 
    //         "data": JSON.stringify(Data),
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
     // Mock Value
    resolve([
        {value: 1, text: '銀行經辦'},
        {value: 2, text: '集保經辦'},
        {value: 3, text: '管理員'},
        {value: 4, text: '銀行主管'},
    ]);
    });
}

/**
 * 由 ajax 獲得 [欄位]-[群組]選項
 */
function getGroupsOptionsSource() {
    return new Promise((resolve, reject) => {
    //     const Data = form.elements("user-account").value;
    //     $.ajax({
    //         "type": "GET",
    //         "url": '#', // TODO: 
    //         "data": JSON.stringify(Data),
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
     // Mock Value
    resolve([
        {value: 1, text: '本國銀行組'},
        {value: 2, text: '外國銀行組'},
    ]);
    });
}

/**
 * 生成選項 DOM & Value
 */
function createOptions(className, source) {
    const container = document.getElementById(className);
    source.map((data, index) => {
        const option = document.createElement("option");
        option.setAttribute('value', data.value);option.setAttribute('data-label', 'primary');
        option.innerText = data.text;
        container.appendChild(option);
    })
}

function toggleBtnActivate() {
    const Value = BtnActivate.value;
    console.log('aa-toggle0', Value, BtnActivate.value)
    BtnActivate.innerText = Value === 'true' ? '未啟動' : '已啟動';
    BtnActivate.setAttribute('value', Value === 'true' ? 'false' : 'true')
    BtnActivate.classList.remove(Value === 'true' ? 'btn-secondary' : 'btn-primary');
    BtnActivate.classList.add(Value === 'true' ? 'btn-primary' : 'btn-secondary');
}

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
