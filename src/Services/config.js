import axios from 'axios';

const baseURL = "https://100085.pythonanywhere.com";

if (!baseURL) {
    throw new Error('VITE_SERVER_URL is not defined in the environment variables.');
}

const servicesAxiosInstance = axios.create({
    baseURL: baseURL
});

export {
    servicesAxiosInstance
};