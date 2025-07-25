// Returns the saved token
export function getToken() { 
    return localStorage.getItem('token');
};

// Redirect to login if not logged in
export function redirectIfNotLogged() {
    if(!getToken()) {
        window.location.href = 'login.html';
    }
};

// Decode the JWT payload
export function parseJwt(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
        return null;
    }
}
