import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { Form } from './styles';
import { loginCliente } from '../../../services/api/clientAPI'; 
import { loginUsuario } from '../../../services/api/userAPI';
import { AuthContext } from '../../../contexts/AuthContext';

const Login = ({ tipo }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); 

        try {
            let response;

            if (tipo === 'cliente') {
                response = await loginCliente({ email, senha });
                const token = response;
                localStorage.setItem('token', token);
                localStorage.setItem('tipo', 'cliente');
                login({ type: 'cliente' });
                window.location.href = '/';
            }  

            if (tipo === 'funcionario') {
                response = await loginUsuario({ email, senha });
                const token = response;
                localStorage.setItem('token', token);
                localStorage.setItem('tipo', 'funcionario');
                login({ type: 'funcionario' });
                window.location.href = '/backoffice';
            }

        } catch (err) {
            setError('Erro ao fazer login. Verifique suas credenciais.');
            console.error(err);
        }
    };

    return (
        <>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Entrar</button>
            </Form>
        </>
    );
};

export default Login;

Login.propTypes = {
    tipo: PropTypes.string.isRequired,
};