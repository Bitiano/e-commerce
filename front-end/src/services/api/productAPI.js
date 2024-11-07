import { api, apiImgbb } from './axiosConfig';

export const incluiProduto = async (token, produto) => {
    try {
        const response = await api.post('/produto/incluiProduto', produto, {
            params: { token },
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao incluir produto:", error);
        throw error.response.data;
    }
};

export const buscaProdutoPorId = async (id) => {
    try {
        const response = await api.get(`/produto/listaProduto/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar produto:", error);
        throw error.response ? error.response.data : error;
    }
};

export const atualizaStatusProduto = async (token, id) => {
    try {
        const response = await api.put(`/produto/atualizaStatusProduto/${id}`, null, {
            params: { token },

        });
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar status do produto:", error);
        throw error.response.data;
    }
};

export const atualizaProduto = async (token, id, produto) => {
    try {
        const response = await api.put(`/produto/atualizaProduto/${id}`, produto, {
            params: { token },
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        throw error.response.data;
    }
};

export const buscaProdutos = async (nomeFiltro = '', page = 0, size = 10) => {
    try {
        const response = await api.get('/produto/buscaProdutos', {
            params: { nomeFiltro, page, size },
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        throw error.response.data;
    }
};

export const uploadImagem = async (formData) => {
    try {
        const response = await apiImgbb.post('/upload', formData);
        return response.data;
    } catch (error) {
        console.error("Erro ao fazer upload da imagem:", error);
        throw error.response ? error.response.data : error;
    }
};