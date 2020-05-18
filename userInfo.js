let cur_user = localStorage.getItem('cur'); 

const loadUser = function(){
    const user = document.getElementById('user');
    user.innerHTML = '';
    user.textContent = `User: ${cur_user}`;
}

