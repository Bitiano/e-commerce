document.addEventListener('DOMContentLoaded', () => {
    const boxBtns = document.getElementById('box-btns');
    const token = localStorage.getItem('token');

    async function fetchUserData(token) {
        try {
            const response = await fetch(`http://localhost:8080/usuario/informacoes?jwtToken=${token}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const user = await response.json();
                return user;
            } else {
                throw new Error('Erro ao buscar dados do usuário');
            }
        } catch (error) {
            alert('Erro ao buscar dados do usuário');
        }
    }

    async function initBackoffice() {
        const user = await fetchUserData(token);
        if (user) {
            if (user.grupo === 'ADMIN') {
                boxBtns.innerHTML = `
                    <a href="users-list.html" class="btn btn-users-list">Lista de Usuários</a>
                    <a href="products-list.html" class="btn btn-products-list">Lista de Produtos</a>
                `;
            } else if (user.grupo === 'ESTOQUISTA') {
                boxBtns.innerHTML = `
                    <a href="products-list.html" class="btn btn-products-list">Lista de Produtos</a>
                `;
            }
        }
    }

    initBackoffice();
});