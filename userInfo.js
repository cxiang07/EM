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

    textEl.textContent = `${oneExp.date} - ${oneExp.name} - ${oneExp.money}`;
    expEl.appendChild(textEl)

    return expEl;
}

const renderExpense = function(){
    allExp = JSON.parse(localStorage.getItem(curr));
    document.querySelector('#exp').innerHTML = '';
    allExp.forEach(function (oneExp) {
        const one = generateExpDOM(oneExp)
        document.getElementById('exp').appendChild(one)
    })
}