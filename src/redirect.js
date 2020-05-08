const subBt = document.getElementById('submit-user');
const userID = document.getElementById('user-id');

subBt.addEventListener('click',function(e){
    e.preventDefault();
    const id = userID.value;
    localStorage.setItem('cur',id);
    location.assign('manager.html');
})
