document.querySelector('#submit').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.errorLable').innerHTML = '';
    let newItem = document.querySelector('#newItem');
    try {
        let item = generateItem(newItem);
        renderItem(item);
    }
    catch (e) {
        renderError(e);
    }
});

const generateItem = function (newItem) {
    let name = newItem.querySelector('.itemName').value;
    let money = newItem.querySelector('.itemMoney').value;
    let cate = newItem.querySelector('.dropdown').value;
    let date = newItem.querySelector('.date').value;
    let item = {};
    let moneyNum = parseInt(money);
    if (moneyNum < 0) {
        throw new Error('Money value is less than 0 !');
    }
    item['name'] = name;
    item['money'] = parseInt(money);
    item['cate'] = cate;
    item['date'] = date;
    return item;
};

const renderItem = function (item) {
    
}

const renderError = function (e) {
    let errorChild = document.createElement('p');
    errorChild.className = 'error';
    errorChild.textContent = e.message;
    document.querySelector('.errorLable').appendChild(errorChild);
}