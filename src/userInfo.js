let curr = localStorage.getItem('cur'); 
let allExp = null;

const userInfo = function(){
    const user = document.getElementById('user');
    user.innerHTML = '';
    user.textContent = `Current user: ${curr}`;
}

const saveExp = function () {
    localStorage.setItem(curr, JSON.stringify(allExp))
}

const removeExp = function (id) {
    const idx = allExp.findIndex(function (oneExp) {
        return oneExp.id === id
    })

    if (idx > -1) {
        allExp.splice(idx, 1)
    }
}

const generateExpDOM = function(oneExp){
    let expEl = document.createElement('div')
    let textEl = document.createElement('label')
    let button = document.createElement('button')

    button.textContent = 'x'
    expEl.appendChild(button)
    button.addEventListener('click', function () {
        removeExp(oneExp.id);
        saveExp();
        renderExpense();
    })

    textEl.textContent = `${oneExp.cate} -- spend ${oneExp.money}$ for ${oneExp.name} on ${oneExp.date} `;
    expEl.appendChild(textEl);
    expEl.className = 'list-item';
    return expEl;
}


const renderExpense = function(){
    allExp = JSON.parse(localStorage.getItem(curr));
    const render = document.querySelector('.renderItem');
    render.innerHTML = '';
    let title = document.createElement('h4');
    title.className = 'list-title'
    title.textContent = "Expense summary💰";
    document.querySelector('.renderTitle').innerHTML = '';
    document.querySelector('.renderTitle').append(generateSummary());
    allExp.forEach(function (oneExp) {
        const one = generateExpDOM(oneExp)
        render.appendChild(one)
    })
}

const generateSummary = function(){
    let totalmoney = 0;
    let sum = document.createElement('h4');
    sum.className = 'list-summary'
    allExp.forEach(function(oneExp){
        totalmoney+= oneExp.money;
    });
    sum.textContent = `You spend ${totalmoney}$💰in total.`;
    return sum;
}