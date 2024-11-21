import { useContext } from 'react';
import { RedirectButton } from '../../components/Buttons/ButtonRedirect';
import { AuthContext } from '../../contexts/AuthContext';

export const Backoffice = () => {
    const { user } = useContext(AuthContext);

    return (
        <div style={{ marginTop: '5rem' }}>
            <h1 style={{ textAlign: 'center' }}>Backoffice</h1>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '5rem' }}>
                {user.grupo === 'ADMIN' && <RedirectButton to="/backoffice/users-list">Lista de Usuarios</RedirectButton>}
                <RedirectButton to="/backoffice/products-list">Lista de Produtos</RedirectButton>
                {user.grupo === 'ESTOQUISTA' && <RedirectButton to='/backoffice/orders-list'>Lista de Pedidos</RedirectButton>}
            </div>
        </div>
    );
};
