document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout-button');

    logoutButton.addEventListener('click', (event) => {
        event.preventDefault();
        localStorage.removeItem('token');
        window.location.href = 'products-view.html';
    });
});