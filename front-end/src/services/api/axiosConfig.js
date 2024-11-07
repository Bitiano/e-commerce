import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8080', 
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token'); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export const cepApi = axios.create({
    baseURL: 'https://viacep.com.br/ws',
    headers: {
        'Content-Type': 'application/json',
    },

    transformResponse: [
        (data) => {
            if (data) {
                return JSON.parse(data);
            }
            return data;
        }
    ]
}); 

export const apiImgbb = axios.create({
    baseURL: 'https://api.imgbb.com/1',
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    params: {
        key: import.meta.env.VITE_API_KEY_IMGBB
    }
});