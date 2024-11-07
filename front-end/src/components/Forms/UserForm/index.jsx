import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { registraUsuario, atualizaUsuario, buscaUsuarioPorId } from "../../../services/api/userAPI";
import { cpfValidator } from "../../../utils/cpfValidator";
import { AuthContext } from '../../../contexts/AuthContext';
import PropTypes from 'prop-types';

export const UserForm = ({ userId }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
    const [grupo, setGrupo] = useState('');
    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
           
            if (userId === user.id) {
                alert('Você não pode editar seu próprio usuário');
                navigate('/backoffice/users-list');
                return;
            } 

            const fetchUser = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const user = await buscaUsuarioPorId(userId, token);
                    setNome(user.nome);
                    setEmail(user.email);
                    setCpf(user.cpf);
                    setGrupo(user.grupo);
                } catch (error) {
                    console.error("Erro ao buscar usuário:", error);
                }
            };
            fetchUser();
        }
    }, [userId, user.id, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!cpfValidator(cpf)) {
            alert('CPF inválido');
            return;
        }

        if (senha !== confirmacaoSenha) {
            alert('Senhas não conferem');
            return;
        }

        const usuario = {
            nome,
            email,
            cpf,
            senha,
            grupo,
            ativo: true
        };

        try {
            const token = localStorage.getItem('token');
            if (userId) {
                await atualizaUsuario(userId, usuario, token);
            } else {
                await registraUsuario(usuario, token);
            }
            navigate('/backoffice/users-list');
        } catch (error) {
            console.error('Erro ao salvar usuário:', error);
        }
    }

    const handleCancel = () => {
        navigate('/backoffice/users-list');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="nome">Nome</label>
                <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    {...userId && { disabled: true }}   
                />
            </div>
            <div>
                <label htmlFor="cpf">CPF</label>
                <input
                    type="text"
                    id="cpf"
                    name="cpf"
                    value={cpf}
                    onChange={(event) => setCpf(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="senha">Senha</label>
                <input
                    type="password"
                    id="senha"
                    name="senha"
                    value={senha}
                    onChange={(event) => setSenha(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="confirmacaoSenha">Confirmação de Senha</label>
                <input
                    type="password"
                    id="confirmacaoSenha"
                    name="confirmacaoSenha"
                    value={confirmacaoSenha}
                    onChange={(event) => setConfirmacaoSenha(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="grupo">Grupo</label>
                <select
                    id="grupo"
                    name="grupo"
                    value={grupo}
                    onChange={(event) => setGrupo(event.target.value)}
                >
                    <option value="ADMIN">Administrador</option>
                    <option value="ESTOQUISTA">Estoquista</option>
                </select>
            </div>
            <button type="submit">Enviar</button>
            <button type="button" onClick={handleCancel}>Cancelar</button>
        </form>
    )
};

UserForm.propTypes = {
    userId: PropTypes.string,
};