import { createUserEditForm } from './editForm.js';

document.addEventListener('DOMContentLoaded', async () => {
    const formContainer = document.getElementById('form-container');
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    const token = localStorage.getItem('token');

    async function fetchUserData(userId) {
        try {
            const response = await fetch(`http://localhost:8080/usuario/buscaUsuario/${userId}?token=${token}`, {
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
            console.error(error);
            alert('Erro ao buscar dados do usuário');
        }
    }

    async function initEditForm() {
        const user = await fetchUserData(userId);
        if (user) {
            const editForm = createUserEditForm(user);
            formContainer.appendChild(editForm);

            editForm.addEventListener('submit', async (event) => {
                event.preventDefault();

                const nome = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const confirmPassword = document.getElementById('confirmPassword').value;
                const grupo = document.getElementById('group').value;

                if (password && password !== confirmPassword) {
                    alert('As senhas não são iguais. Tente novamente');
                    return;
                }

                const updatedUser = { nome, email, grupo };
                if (password) {
                    updatedUser.senha = password;
                }


                try {
                    const response = await fetch(`http://localhost:8080/usuario/atualizaUsuario/${userId}?token=${token}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedUser)
                    });

                    if (response.ok) {
                        alert('Usuário atualizado com sucesso');
                        window.location.href = '/front-end/pages/users-list.html';
                    } else {
                        const errorData = await response.json();
                        alert(`Erro ao atualizar usuário: ${errorData.message}`);
                    }
                } catch (error) {
                    alert(`Erro ao atualizar usuário: ${error.message}`);
                }
            });
        }
    }

    initEditForm();
});