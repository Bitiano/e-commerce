import { createUserEditForm } from './editFom.js';

function fetchUserByEmail(email) {
    return {
        name: 'Teste',
        cpf: '456.489.646-78',
        email: 'teste@gmail.com',
        gruop: 'administrador'
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.getElementById('form-container');

    const userEmail = new URLSearchParams(window.location.search).get('email');
    const user = fetchUserByEmail(userEmail);

    const editForm = createUserEditForm(user);
    formContainer.appendChild(editForm);

    editForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const gruop = document.getElementById('gruop').value;

        if (password && password !== confirmPassword) {
            alert('As senhas não são iguais. Tente novamente');	
            return;
        }

        const updatedUser = { name, email, gruop };
        if (password) {
            updatedUser.password = password; 
        }
        console.log('Usuário atualizad ', updatedUser);

        alert('Usuário atualizado com sucesso');
        window.location.href = '/pages/users-list.html'; 
    });
});
