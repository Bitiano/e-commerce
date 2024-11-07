import { api } from './axiosConfig';

export const registraUsuario = async (usuario, token) => {
    try {
        const response = await api.post('/usuario/incluiAcesso', usuario, {
            params: { token },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error.response.data;
    }
};

export const loginUsuario = async (usuarioLoginDto) => {
    try {
        const response = await api.post('/usuario/login', usuarioLoginDto);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error.response.data;
    }
};

export const atualizaUsuario = async (id, usuario, token) => {
    try {
        const response = await api.put(`/usuario/atualizaUsuario/${id}`, usuario, {
            params: { token },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error.response.data;
    }
};


export const atualizaStatusUsuario = async (id, token) => {
    try {
        const response = await api.put(`/usuario/atualizaAcessoUsuario/${id}`, null, {
            params: { token },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error.response.data;
    }
}

export const buscaUsuarios = async (nomeFiltro, token) => {
    try {
        const response = await api.get('/usuario/buscaUsuarios', {
            params: { nomeFiltro, token },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error.response.data;
    }
};

export const buscaUsuarioPorId = async (id, token) => {
    try {
        const response = await api.get(`/usuario/buscaUsuario/${id}`, {
            params: { token },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error.response.data;
    }
};

export const buscaUsuarioPorToken = async (token) => {
    try {
        const response = await api.get(`/usuario/informacoes`, {
            params: { jwtToken: token },
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error.response.data;
    }
}