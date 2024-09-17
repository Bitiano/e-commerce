import { createUserForm } from './registerForm.js';
import { validateCPF } from './validateCPF.js';

document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.getElementById('form-container');
    const userForm = createUserForm();

    formContainer.appendChild(userForm);

    userForm.addEventListener('submit', async (event) => {
        event.preventDefault(); 
        
        const name = document.getElementById('name').value;
        const cpf = document.getElementById('cpf').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const group = document.getElementById('group').value;
        const token = localStorage.getItem('token');
        
        if (!validateCPF(cpf)) {
            alert('CPF inválido. Tente novamente');
            return;
        }

        if (password !== confirmPassword) {
            alert('As senhas não são iguais. Tente novamente');
            return;
        }

        const newUser = { nome: name, cpf, email, ativo:true, senha: password, grupo: group };
        console.log(newUser);

        try {
            const response = await fetch(`http://localhost:8080/usuario/incluiAcesso?token=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });

            if (response.ok) {
                alert('Usuário cadastrado com sucesso');
                userForm.reset();
                window.location.href = './users-list.html'; 
            } else {
                const errorData = await response.json();
                alert(`Erro ao cadastrar usuário: ${errorData.message}`);
            }
        } catch (error) {
            alert(`Erro ao cadastrar usuário: ${error.message}`);
        }
    });
});