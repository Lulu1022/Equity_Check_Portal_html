let tempData = {  // 暫存資料
    title: '', content: '', time: ''}

// BEGIN: Initial
document.getElementById('title').textContent = `${getUrlParam('name')} 稽核/告警事件`;
getData().then(source => {
    renderMails(source)});
//END: Initial

/** 卡片轉換成編輯模式 */
function toEditType(event) {
    const target = document.getElementById(`container-${event.target.value}`);
    const input = target.getElementsByTagName('input')[0];
    const textArea = target.getElementsByTagName('textarea')[0];
    const btnCancel = target.getElementsByTagName('button')[0];
    const btnSubmit =  target.getElementsByTagName('button')[1];
    const btnEdit =  target.getElementsByTagName('button')[2];

    target.classList.add('on-edit');
    input.removeAttribute('disabled');
    textArea.removeAttribute('disabled');

    btnEdit.classList.add('d-none');
    btnSubmit.classList.remove('d-none');
    btnCancel.classList.remove('d-none');
}

/** 卡片轉換成檢視模式 */
function toViewType(data, event) {
    const target = document.getElementById(`container-${event.target.value}`);
    const input = target.getElementsByTagName('input')[0];
    const textArea = target.getElementsByTagName('textarea')[0]; 
    const time = target.getElementsByTagName('p')[0];
    const btnCancel = target.getElementsByTagName('button')[0];
    const btnSubmit =  target.getElementsByTagName('button')[1];
    const btnEdit =  target.getElementsByTagName('button')[2];
    input.value = data.title;
    textArea.innerHTML = decodeHTML(data.content);
    time.textContent = data.time;

    target.classList.remove('on-edit');
    input.disabled = true;
    textArea.disabled = true;

    btnEdit.classList.remove('d-none');
    btnSubmit.classList.add('d-none');
    btnCancel.classList.add('d-none');
}

/**
 * 獲得所有信件資料
 * @param  id 身份
 * @returns 
 */
function getData() {
    return new Promise((resolve) => {
    //     $.ajax({
    //         type: 'GET',
    //         url: '#',
    //         data: '',
    //         dataType: 'json',
    //         success: function (data, status, xhr) {
    //             resolve(data);
    //             console.log(data);
    //         }
    //         ,
    //         error: function (xhr, error, thrown) {
    //             reject(error)
    //             console.log('Error in Operation', error);
    //         }
    //     })
    
    resolve( //Mock
        [{
            title: '首次申報',
            content: '新輸入申報之檢核結果',
            time: '8 Aug 2020, 8:25'
        },
        {
            title: '持股比率變動達 1%',
            content: '檢核後發現持股比率變動達1%',
            time: '8 Aug 2020, 8:25'
        },
        {
            title: '持股比率變動達 10%',
            content: '檢核後發現持股比率變動達10%',
            time: '8 Aug 2020, 8:25' 
        },
        {
            title: '持股比率變動達 10%',
            content: '檢核後發現持股比率變動達10%',
            time: '8 Aug 2020, 8:25' 
        },
        {
            title: '持股比率變動達 10%',
            content: '檢核後發現持股比率變動達10%',
            time: '8 Aug 2020, 8:25' 
        }]
    )
    })
}

/**
 * 送出修改後的信件
 */
function postData(event) {
    const target = document.getElementById(`container-${event.target.value}`);
    const Data = {
        title: target.getElementsByTagName('input')[0].value,
        content: target.getElementsByTagName('textarea')[0].value,
        time: target.getElementsByTagName('p')[0].textContent
    }
    
    return new Promise((resolve) => {
            // $.ajax({
            //     type: 'POST',
            //     url: '#',
            //     data: Data,
            //     dataType: 'json',
            //     success: function (data, status, xhr) {
            //         resolve(data);
            //         console.log(data);
            //     }
            //     ,
            //     error: function (xhr, error, thrown) {
            //         reject(error)
            //         console.log('Error in Operation', error);
            //     }
            // })
            resolve({ // Mock
                title: Data.title,
                content: Data.content,
                time: Data.time
            })
    });
}

/** 依資料生成信件列表 */
function renderMails(source) {
    const card = document.getElementsByClassName('card')[0];
    source.map((data, index) => {
        const container = document.createElement('div');
        const inputGroup = document.createElement('div');
        const textArea = document.createElement('textarea');
        const btnGroup = document.createElement('div');
        const input = document.createElement('input');
        const time = document.createElement('p');
        const btnCancel = document.createElement('button');
        const btnSubmit = document.createElement('button');
        const btnEdit = document.createElement('button');
        container.classList.add('cards-container', 'd-flex', 'flex-column', 'bg-white', 'mb-20');
        inputGroup.classList.add('d-flex', 'flex-row', 'align-items-center', 'justify-content-between', 'w-100', 'pl-20');
        textArea.classList.add('bg-pass', 'p-20');
        btnGroup.classList.add('d-flex', 'flex-row-reverse', 'pb-20', 'pb-10');
        input.classList.add('input', 'bg-pass', 'w-100');
        time.classList.add('m-0');
        btnCancel.classList.add('btn', 'btn-outline-secondary', 'ml-20', 'mr-20', 'd-none');
        btnSubmit.classList.add('btn', 'btn-primary', 'd-none');
        btnEdit.classList.add('btn', 'btn-primary', 'mr-20');
        
        container.setAttribute('id', `container-${index}`);
        input.setAttribute('type', 'text');
        textArea.setAttribute('rows', '3');textArea.setAttribute('id', 'content');
        input.disabled = true;
        textArea.disabled = true;
        btnCancel.setAttribute('type', 'button');btnCancel.setAttribute('id', 'btn-cancel');btnCancel.setAttribute('value', index);
        btnSubmit.setAttribute('type', 'button');btnSubmit.setAttribute('id', 'btn-submit');btnSubmit.setAttribute('value', index);
        btnEdit.setAttribute('type', 'button');btnEdit.setAttribute('id', 'btn-edit');btnEdit.setAttribute('value', index);

        input.value = data.title;
        textArea.value = decodeHTML(data.content);
        time.textContent = data.time;

        inputGroup.append(input, time);
        btnCancel.append('取消');
        btnSubmit.append('儲存變更');
        btnEdit.append('編輯');
        btnGroup.append(btnCancel, btnSubmit, btnEdit);
        container.append(inputGroup, textArea, btnGroup);
        card.appendChild(container);

        // 按鈕事件
        btnEdit.addEventListener('click', function(event) {
            setTempData(event);
            disableOtherMails(event);
            toEditType(event) });
        
        btnSubmit.addEventListener('click', function(event) { 
            enableAllMails();
            postData(event)
            .then((data) => {
                clearTempData();
                toViewType(data, event)})
            .catch(error => {
                // error...
            })
        });
        
        btnCancel.addEventListener('click', function(event) { 
            backtrackTempData(event);
            enableAllMails();
            toViewType(tempData, event);
        })
    })
}

function setTempData(event) {
    const target = document.getElementById(`container-${event.target.value}`);
    tempData = {
        title: target.getElementsByTagName('input')[0].value,
        content: target.getElementsByTagName('textarea')[0].value,
        time: target.getElementsByTagName('p')[0].textContent
    }
}

function clearTempData() {
    tempData = {
        title: '', content: '', time: '' }
}

function backtrackTempData(event) {
    const target = document.getElementById(`container-${event.target.value}`);
    target.getElementsByTagName('input')[0].value = tempData.title;
    target.getElementsByTagName('textarea')[0].value = tempData.content;
    target.getElementsByTagName('p')[0].textContent = tempData.time;
}

// html編碼
function encodeHTML (unsafe_str) {
    return unsafe_str
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\"/g, '&quot;')
        .replace(/\'/g, '&#39;')
        .replace(/\//g, '&#x2F;')
}

// html解碼
function decodeHTML (source_str) {
    return source_str
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&#x2F;/g, '/')
}

// 鎖其他 mail
function disableOtherMails(event) {
    const mailGroup = document.getElementsByClassName('cards-container');
    Array.from(mailGroup).forEach((node, index) => {
        if (node.id !== `container-${event.target.value}`) {
            node.getElementsByTagName('button')[2].disabled = true;
            document.getElementById(`container-${index}`).classList.add('fade-content');
        }
    })
}

// 解鎖全部 mail
function enableAllMails() {
    const mailGroup = document.getElementsByClassName('cards-container');
    Array.from(mailGroup).map((node, index) => {
        node.getElementsByTagName('button')[2].disabled = false;
        document.getElementById(`container-${index}`).classList.remove('fade-content');
    });
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