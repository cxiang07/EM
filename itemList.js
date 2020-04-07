document.querySelector('#submit').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.errorLable').innerHTML = '';
    document.querySelector('.renderItem').innerHTML = '';
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
    const title = document.createElement('h4');
    title.textContent = "Here is the result";
    const renderResult = document.createElement('select');
    renderResult.className = "itemList";
    const oneItem = document.createElement('option');
    oneItem.text = `${item.cate}  :  Spent  ${item.money} $  on  ${item.date}  for  ${item.name}`;
    renderResult.options.add(oneItem,1);
    document.querySelector('.renderItem').appendChild(title);
    document.querySelector('.renderItem').appendChild(renderResult);
}

const renderError = function (e) {
    let title = document.createElement('h4');
    title.textContent = "Error : "
    let errorChild = document.createElement('p');
    errorChild.className = 'error';
    errorChild.textContent = e.message;
    document.querySelector('.errorLable').appendChild(title);
    document.querySelector('.errorLable').appendChild(errorChild);
}