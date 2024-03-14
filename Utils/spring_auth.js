import axios from 'axios';

const springWithAuth = () => {
    const AUTH_TOKEN_HEADER_NAME = 'X-API-KEY';
    const AUTH_TOKEN = 'rachna';

    const instance = axios.create();

    instance.interceptors.request.use((config) => {
        config.headers[AUTH_TOKEN_HEADER_NAME] = AUTH_TOKEN;
        return config;
    });

    return instance;
};

export default springWithAuth;
