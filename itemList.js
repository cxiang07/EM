let curr = localStorage.getItem('cur'); 

document.querySelector('.post-submit').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.pic').innerHTML = '';
    document.querySelector('#photoText').innerHTML = '';
    document.querySelector('.records').innerHTML = '';
    document.querySelector('.result-title').innerHTML = '';
    let newItem = document.querySelector('.new-record');
    try {
        let item = generateItem(newItem);
        renderItem(item);
    }
    catch (e) {
        renderError(e);
    }
});

const generateItem = function (newItem) {
    let name = newItem.querySelector('.record-name').value;
    let money = newItem.querySelector('.record-money').value;
    let date = newItem.querySelector('.record-date').value;
    if(date == '') date = getTime();
    let item = {};
    let moneyNum = parseInt(money);
    if (moneyNum < 0||isNaN(moneyNum)) {
        throw new Error('Money value is less than 0 !');
    }
    item['name'] = name;
    item['money'] = parseInt(money);
    item['cate'] = getCate();
    item['date'] = date;
    item['id'] = uuidv4();
    let savedRecords = JSON.parse(localStorage.getItem(curr)||"[]");
    savedRecords.push(item);
    localStorage.setItem(curr,JSON.stringify(savedRecords));
    return item;
};

const getTime = function(){
    let date = new Date();
    return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
}

const renderItem = function (item) {
    const title = document.createElement('h3');
    title.textContent = "Here is the result";
    title.className = 'result-title';
    const renderResult = generateExpDOM(item);
    document.querySelector('.result-title').appendChild(title);
    document.querySelector('.records').appendChild(renderResult);
}

const renderError = function (e) {
    let title = document.createElement('h3');
    title.textContent = "Error : ";
    title.className = 'result-title error';
    let errorChild = document.createElement('p');
    errorChild.className = 'error-message';
    errorChild.textContent = e.message;
    document.querySelector('.result-title').appendChild(title);
    document.querySelector('.records').appendChild(errorChild);
}

const saveExp = function (allExp) {
    localStorage.setItem(curr, JSON.stringify(allExp))
}

const removeExp = function (id) {
    let allExp = JSON.parse(localStorage.getItem(curr));
    const idx = allExp.findIndex(function (oneExp) {
        return oneExp.id === id
    })

    if (idx > -1) {
        allExp.splice(idx, 1)
    }
    saveExp(allExp);
}

const generateExpDOM = function(oneExp){
    let expEl = document.createElement('div')
    let textEl = document.createElement('text')
    let button = document.createElement('button')
    textEl.className = 'record-content';
    button.textContent = 'x';
    button.className = 'record-button';
    expEl.appendChild(button);
    let date = document.createElement('label');
    date.textContent = oneExp.date;
    date.className = 'date-label';
    expEl.appendChild(date);
    button.addEventListener('click', function () {
        removeExp(oneExp.id);
        renderExpense();
    });
    if(oneExp.cate.length != 0){
    oneExp.cate.forEach((oneCate)=>{
        let oneEmoji = document.createElement('label');
        oneEmoji.textContent = cateEmoji(oneCate);
        oneEmoji.className = 'emoji'
        expEl.appendChild(oneEmoji);
    })
}
    textEl.textContent = `spend ${oneExp.money}$ for ${oneExp.name}`;
    expEl.appendChild(textEl);
    expEl.className = 'one-record';
    return expEl;
}


const renderExpense = function(){
    let allExp = JSON.parse(localStorage.getItem(curr));
    const render = document.querySelector('.records');
    render.innerHTML = '';
    document.querySelector('.pic').innerHTML = '';
    document.querySelector('#photoText').innerHTML = '';
    let title = document.createElement('h3');
    title.className = 'result-title'
    title.textContent = "Expense summary💰";
    document.querySelector('.result-title').innerHTML = '';
    document.querySelector('.result-title').append(generateSummary());
    allExp.forEach(function (oneExp) {
        const one = generateExpDOM(oneExp)
        render.appendChild(one)
    })
}

const generateSummary = function(){
    let allExp = JSON.parse(localStorage.getItem(curr));
    let totalmoney = 0;
    let sum = document.createElement('h3');
    sum.className = 'result-title'
    allExp.forEach(function(oneExp){
        totalmoney+= oneExp.money;
    });
    sum.textContent = `You spend ${totalmoney}$💰in total.`;
    return sum;
}

const getCate = function(){
    let allStates = document.querySelectorAll('.record-cate');
    let result = [];
    for(let i =0;i<allStates.length;i++) {
        if(allStates[i].children[0].checked) {
            result.push(allStates[i].children[0].id);
        }
    }
    return result;
}

const cateEmoji = function(state){
    switch(state){
        case 'grocery' : 
            return "🥦";
            break;
        case 'snack' : 
             return "🍩";
             break;
        case 'cloth' :
             return "👕"
             break;
        case 'rent' :
             return "🏡"
             break;

    }
}