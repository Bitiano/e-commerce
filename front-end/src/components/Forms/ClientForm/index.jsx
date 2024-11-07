import { useState, useEffect } from 'react';
import { cpfValidator } from '../../../utils/cpfValidator';
import { Form } from './styles';
import PropTypes from 'prop-types';

export const ClientForm = ({ onNext, initialData, isEdit }) => {
    const [nomeCompleto, setNome] = useState(initialData?.nomeCompleto || '');
    const [dataNascimento, setDataNascimento] = useState(initialData?.dataNascimento || '');
    const [genero, setGenero] = useState(initialData?.genero || '');
    const [email, setEmail] = useState(initialData?.email || '');
    const [cpf, setCpf] = useState(initialData?.cpf || '');
    const [senha, setSenha] = useState('');
    const [senhaConfirmacao, setSenhaConfirmacao] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setNome(initialData.nomeCompleto);
            setDataNascimento(initialData.dataNascimento);
            setGenero(initialData.genero);
            setEmail(initialData.email);
            setCpf(initialData.cpf);
        }
    }, [initialData]);

    const validate = () => {
        const newErrors = {};

        if (!cpfValidator(cpf)) {
            newErrors.cpf = 'CPF inválido';
        }

        const nomeParts = nomeCompleto.trim().split(' ');
        if (nomeParts.length < 2 || nomeParts.some(part => part.length < 3)) {
            newErrors.nomeCompleto = 'Nome deve ter pelo menos 2 palavras com no mínimo 3 letras cada';
        }

        if (senha !== senhaConfirmacao) {
            newErrors.senha = 'As senhas não coincidem';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const cliente = { nomeCompleto, dataNascimento, genero, email, cpf, senha };
            onNext(cliente);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h2>{isEdit ? 'Atualizar' : 'Cadastrar'} </h2>
            <div>
                <label>Nome Completo:</label>
                <input type="text" value={nomeCompleto} onChange={(e) => setNome(e.target.value)} required />
                {errors.nomeCompleto && <p style={{ color: 'red' }}>{errors.nomeCompleto}</p>}
            </div>
            <div>
                <label>Data de Nascimento:</label>
                <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} required />
            </div>
            <div>
                <label>Gênero:</label>
                <select value={genero} onChange={(e) => setGenero(e.target.value)} required>
                    <option value="">Selecione</option>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outro">Outro</option>
                </select>
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required {...(isEdit ? { disabled: true } : {})} />
            </div>
            <div>
                <label>CPF:</label>
                <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} required {...(isEdit ? { disabled: true } : {})} />
                {errors.cpf && <p style={{ color: 'red' }}>{errors.cpf}</p>}
            </div>
            <div>
                <label>Senha:</label>
                <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} {...(isEdit ? { placeholder: 'Deixe em branco para manter a senha atual' } : { required: true })} />
            </div>
            <div>
                <label>Confirmação de Senha:</label>
                <input type="password" value={senhaConfirmacao} onChange={(e) => setSenhaConfirmacao(e.target.value)} {...(isEdit ? { placeholder: 'Deixe em branco para manter a senha atual' } : { required: true })} />
                {errors.senha && <p style={{ color: 'red' }}>{errors.senha}</p>}
            </div>
            <button type="submit">{isEdit ? 'Atualizar' : 'Próximo'}</button>
        </Form>
    );
};

ClientForm.propTypes = {
    onNext: PropTypes.func.isRequired,
    initialData: PropTypes.object,
    isEdit: PropTypes.bool,
};