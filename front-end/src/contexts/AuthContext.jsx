import { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import { buscaClientePorToken } from '../services/api/clientAPI';
import { buscaUsuarioPorToken } from '../services/api/userAPI';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const tipo = localStorage.getItem('tipo');

        if (token) {
            if (tipo === 'cliente') {
                buscaClientePorToken(token)
                    .then((cliente) => {
                        setUser({ ...cliente, type: 'cliente' });
                    })
                    .catch(() => setUser(null))
                    .finally(() => setLoading(false));
            } else {
                buscaUsuarioPorToken(token)
                    .then((usuario) => {
                        setUser({ ...usuario, type: usuario.grupo });
                    })
                    .catch(() => setUser(null))
                    .finally(() => setLoading(false));
            }
        } else {
            setLoading(false);
        }
    }, []);

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('tipo');
        window.location.href = '/login';
    };

    const login = (user) => {
        setUser(user);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};