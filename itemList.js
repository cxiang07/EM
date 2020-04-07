document.querySelector('#submit').addEventListener('click',(e)=>{
    e.preventDefault();
    document.querySelector('.errorLable').innerHTML = '';
    let newItem = document.querySelector('#newItem');
    let itemName = newItem.querySelector('.itemName').value;
    let money = newItem.querySelector('.itemMoney').value;
    let cate = newItem.querySelector('.dropdown').value;
    let date = newItem.querySelector('.date').value;
    try {
        let item = generateItem(itemName,money,cate,date);
        console.log(item);
    }
    catch(e){
        let errorChild = document.createElement('p');
        errorChild.className = 'error';
        errorChild.textContent = e.message;
        document.querySelector('.errorLable').appendChild(errorChild);
    }   
});

const generateItem = function(name,money,cate,date) {
    let item = {};
    item['name'] = name;
    let moneyNum = parseInt(money);
    if(moneyNum < 0){
        throw new Error('Money value is less than 0 !');
    }
    item['money'] = parseInt(money);
    item['cate'] = cate;
    item['date'] = date;
    return item;
};