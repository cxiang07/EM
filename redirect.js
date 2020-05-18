const idSubBt = document.getElementById('id-submit');
const userID = document.getElementById('user-id');

idSubBt.addEventListener('click',function(e){
    e.preventDefault()
    const id = userID.value;
    localStorage.setItem('cur',id);
    location.assign('manager.html');
});
