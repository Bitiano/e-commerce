import { useState, useEffect } from 'react';
import { Container } from '../../components/Global/Container';
import { ClientForm } from '../../components/Forms/ClientForm';
import { buscaClientePorToken, atualizaCliente } from '../../services/api/clientAPI';

export const EditClient = () => {
    const [clientData, setClientData] = useState(null);

    useEffect(() => {
        const fetchClientData = async () => {
            const token = localStorage.getItem('token');
            const data = await buscaClientePorToken(token);
            setClientData(data);
        };

        fetchClientData();
    }, []);

    const handleUpdate = async (updatedClientData) => {
        const token = localStorage.getItem('token');
        try {
            await atualizaCliente(token, updatedClientData);
            alert('Dados atualizados com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar dados do cliente:', error);
            alert('Erro ao atualizar dados do cliente!');
        }
    };

    return (
        <Container>
            {clientData ? (
                <ClientForm onNext={handleUpdate} initialData={clientData} isEdit={true} />
            ) : (
                <p>Carregando...</p>
            )}
        </Container>
    );
};