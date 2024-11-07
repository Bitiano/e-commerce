import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { buscaUsuarios, atualizaStatusUsuario } from "../../../services/api/userAPI";
import { AuthContext } from '../../../contexts/AuthContext';
import PropTypes from 'prop-types';

export const UserList = ({ searchTerm, searchTrigger }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const data = await buscaUsuarios(searchTerm, token);
                setUsers(data);
                setTotalPages(data.totalPage);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, [searchTrigger, page]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            const confirm = window.confirm(`Deseja realmente ${newStatus ? 'ativar' : 'desativar'} o usuário?`);
            if (!confirm) return;
            const token = localStorage.getItem('token');
            await atualizaStatusUsuario(id, token);
            const updatedUsers = users.map((user) => {
                if (user.id === id) {
                    return { ...user, ativo: newStatus };
                }
                return user;
            });
            setUsers(updatedUsers);
        } catch (error) {
            console.error(error);
        }
    }

    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
        }
    };

    if (loading) {
        return <p>Carregando...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Grupo</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.nome}</td>
                            <td>{user.email}</td>
                            <td>{user.ativo ? 'Ativo' : 'Inativo'}</td>
                            <td>{user.grupo}</td>
                            <td>
                                {currentUser.id !== user.id && (
                                    <>
                                        <button>
                                            <Link to={`/backoffice/edit-user/${user.id}`}>Editar</Link>
                                        </button>
                                        <button onClick={() => handleStatusChange(user.id, !user.ativo)}>
                                            {user.ativo ? 'Desativar' : 'Ativar'}
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button onClick={handlePreviousPage} disabled={page === 0}>Anterior</button>
                <span>Página {page + 1} de {totalPages}</span>
                <button onClick={handleNextPage} disabled={page === totalPages - 1}>Próxima</button>
            </div>
        </>
    );
};

UserList.propTypes = {
    searchTerm: PropTypes.string,
    searchTrigger: PropTypes.bool,
};