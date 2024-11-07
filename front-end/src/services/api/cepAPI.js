import { cepApi } from "./axiosConfig";

export const buscaCep = async (cep) => {
    try {
        const response = await cepApi.get(`/${cep}/json`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};