import { api } from './axiosConfig';

export const incluiPedido = async (token, pedidoDto) => {
    try {
        const response = await api.post(`/pedido/criaPedido/token/${token}`, pedidoDto);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const retornaPedidosPorCliente = async (token) => {
    try {
        const response = await api.get(`/pedido/retornaPedidos/token/${token}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const retornaTodosPedidos = async () => {
    try {
        const response = await api.get(`/pedido/retornaPedidos`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const atualizaStatusPedido = async (id, status) => {
    try {
        const response = await api.put(`/pedido/atualizaStatusPedido/id/${id}`, null, {
            params: { status }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const retornaPedidoDetalhe = async (id) => {
    try {
        const response = await api.get(`/pedido/retornaPedido/id/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};
