import {PORT} from '../../settingsFront.js';

const api = `http://localhost:${PORT}/api`;

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const user = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        cpf: document.getElementById('cpf').value,
        birthDate: document.getElementById('birthDate').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    const res = await fetch(`${api}/auth/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    });

    const data = await res.json();

    if(res.ok) {
        alert('User register successfully');
        window.location.href = 'login.html';
    } else {
        alert(data.message) || 'Error registering user'
    }
});