function updateUserStatus(email, newStatus) {
    
    console.log(`Atualizando status do usuário: ${email} para ${newStatus}`);
   
    alert(`Usuário ${newStatus === 'Ativo' ? 'ativado' : 'desativado'} com sucesso`);
    location.reload(); 
}

export function toggleUserStatus(email, currentStatus) {
    const newStatus = currentStatus === 'Ativo' ? 'Inativo' : 'Ativo';

    const confirmAction = confirm(`Você tem certeza que deseja ${newStatus === 'Ativo' ? 'ativar' : 'inativar'} o usuário ${email}?`);
    
    if (confirmAction) {
        updateUserStatus(email, newStatus);
    }
}
