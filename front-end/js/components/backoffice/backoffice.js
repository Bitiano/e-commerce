document.addEventListener('DOMContentLoaded', () => {
    const boxBtns = document.querySelector('#box-btns');
    const userType = localStorage.getItem('userType');
    if (userType !== 'ADMIN' && userType !== 'ESTOQUISTA') window.location.href = '../index.html';

    async function initBackoffice() {
        
        if (userType === 'ADMIN') {
            boxBtns.innerHTML = `
                <a href="users-list.html" class="btn btn-users-list">Lista de Usuários</a>
                <a href="products-list.html" class="btn btn-products-list">Lista de Produtos</a>
            `;
        } else if (userType === 'ESTOQUISTA') {
            boxBtns.innerHTML = `
                <a href="products-list.html" class="btn btn-products-list">Lista de Produtos</a>
            `;
        }
    }

    initBackoffice();
});