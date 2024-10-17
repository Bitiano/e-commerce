const logout = () => {
    localStorage.removeItem('token');
    location.href = 'login-client.html';
}

export default logout;  