import { useEffect, useState, useContext } from "react";
import { buscaUsuarios, atualizaStatusUsuario } from "../../../services/api/userAPI";
import { AuthContext } from '../../../contexts/AuthContext';
import { Table, TableHeader, TableRow, TableData, Button, PaginationWrapper, PageButton } from './styles';
import { Link } from "react-router-dom";
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
            <Table>
                <thead>
                    <tr>
                        <TableHeader>Nome</TableHeader>
                        <TableHeader>Email</TableHeader>
                        <TableHeader>Status</TableHeader>
                        <TableHeader>Grupo</TableHeader>
                        <TableHeader>Opções</TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableData>{user.nome}</TableData>
                            <TableData>{user.email}</TableData>
                            <TableData>{user.ativo ? 'Ativo' : 'Inativo'}</TableData>
                            <TableData>{user.grupo}</TableData>
                            <TableData>
                                {currentUser.id !== user.id && (
                                    <>
                                        <Button>
                                            <Link to={`/backoffice/edit-user/${user.id}`}>Editar</Link>
                                        </Button>
                                        <Button onClick={() => handleStatusChange(user.id, !user.ativo)}>
                                            {user.ativo ? 'Desativar' : 'Ativar'}
                                        </Button>
                                    </>
                                )}
                            </TableData>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
            <PaginationWrapper>
                <PageButton onClick={handlePreviousPage} disabled={page === 0}>Anterior</PageButton>
                <span>Página {page + 1} de {totalPages}</span>
                <PageButton onClick={handleNextPage} disabled={page === totalPages - 1}>Próxima</PageButton>
            </PaginationWrapper>
        </>
    );
};

UserList.propTypes = {
    searchTerm: PropTypes.string,
    searchTrigger: PropTypes.bool,
};