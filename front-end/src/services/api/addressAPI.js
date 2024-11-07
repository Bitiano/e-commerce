import { api } from './axiosConfig';

export const atualizaEndereco = async (idEndereco, token, endereco) => {
    try {
        const response = await api.put(`/endereco/atualiza/idEndereco/${idEndereco}/token/${token}`, endereco);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const adicionaEndereco = async (token, endereco) => {
    try {
        const response = await api.post(`/endereco/adicionaEndereco/token/${token}`, endereco);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const buscaEnderecosPorCliente = async (token) => {
    try {
        const response = await api.get(`/endereco/buscaEnderecosPorCliente/token/${token}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const buscaEndereco = async (token, idEndereco) => {
    try {
        const response = await api.get(`/endereco/buscaEnderecoClienteEEndereco/token/${token}/idEndereco/${idEndereco}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const atualizaEnderecoPrincipal = async (idEndereco, token) => {
    try {
        await api.put(`/endereco/atualizaPrincipal/idEndereco/${idEndereco}/token/${token}`);
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const inativarEndereco = async (idEndereco, token) => {
    try {
        await api.put(`/endereco/inativarEndereco/idEndereco/${idEndereco}/token/${token}`);
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};