async function updateUserStatus(email, newStatus, userId) {
    
    console.log(`Atualizando status do usuário: ${email} para ${newStatus}`);
    const token = localStorage.getItem('token');
    
    const response = await fetch(`http://localhost:8080/usuario/atualizaAcessoUsuario/${userId}?token=${token}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        alert(`Usuário ${newStatus === 'Ativo' ? 'ativado' : 'desativado'} com sucesso`);
        location.reload(); 
    } else {
        alert('Erro ao atualizar status do usuário');
    }
    
}

export function toggleUserStatus(email, currentStatus, userId) {
    const newStatus = currentStatus === 'Ativo' ? 'Inativo' : 'Ativo';

    const confirmAction = confirm(`Você tem certeza que deseja ${newStatus === 'Ativo' ? 'ativar' : 'inativar'} o usuário ${email}?`);
    
    if (confirmAction) {
        updateUserStatus(email, newStatus, userId);
    }
}
