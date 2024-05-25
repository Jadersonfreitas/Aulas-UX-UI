document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    const validUsers = [
        { username: 'admin', password: 'password' },
        { username: 'roberto', password: '12345' }
    ];

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const validUser = validUsers.find(user => user.username === username && user.password === password);

        if (validUser) {
            localStorage.setItem('loggedIn', 'true');
            window.location.href = 'index.html';
        } else {
            errorMessage.textContent = 'Nome de usuário ou senha incorretos';
        }
    });
});
