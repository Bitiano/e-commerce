import { api } from './axiosConfig';

export const incluiCliente = async (cliente) => {
    try {
        const response = await api.post(`/cliente/incluiCliente`, cliente);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const loginCliente = async (cliente) => {
    try {
        const response = await api.post(`/cliente/login`, cliente);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const atualizaCliente = async (token, cliente) => {
    try {
        const response = await api.put(`/cliente/atualiza/token/${token}`, cliente);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const buscaClientePorToken = async (token) => {
    try {
        const response = await api.get(`/cliente/buscaClienteByToken/token/${token}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};