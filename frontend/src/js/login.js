import { PORT } from "../../settingsFront";

const api = `http://localhost:${PORT}/api`;

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const res = await fetch(`${api}/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    });

    const data = await res.json();

    if(res.ok && data.token) {
        localStorage.setItem('token', data.token);
        alert('Login successful!');
        window.location.href = '../../index.html';
    } else {
        alert(data.message || 'Login error');
    }
});