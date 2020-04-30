const userInfo = function(){
    const user = document.getElementById('user');
    user.innerHTML = '';
    user.textContent = `Current user: ${localStorage.getItem('cur')}`;
}