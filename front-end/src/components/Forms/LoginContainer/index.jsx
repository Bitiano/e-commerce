import { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from '../Login';
import { FormContainer } from './styles';

const LoginContainer = () => {
    const [tipo, setTipo] = useState('cliente'); 

    const toggleTipo = () => {
        setTipo((prevTipo) => (prevTipo === 'cliente' ? 'funcionario' : 'cliente'));
    };

    return (
        <FormContainer>
            <h1>{tipo === 'cliente' ? 'Login para Clientes' : 'Login para Funcionarios'}</h1>
            <Login tipo={tipo} />
            <button onClick={toggleTipo}>
                {tipo === 'cliente' ? 'Sou Funcionário' : 'Sou Cliente'}
            </button>
            { tipo === 'cliente' ? <p><Link to="/register">Cadastre-se</Link></p> : null }
        </FormContainer>
    );
};

export default LoginContainer;
