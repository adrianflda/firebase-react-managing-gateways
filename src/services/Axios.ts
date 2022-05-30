import axios from 'axios'
import { storedUser } from './FireAuthService';

const getToken = () => {
    const user = storedUser();
    if (user) {
        return user.stsTokenManager.accessToken;
    } else {
        return '';
    }
}

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    responseType: "json",
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
    timeout: 2000
});

axiosClient.interceptors.request.use(function (config) {
    config.headers = { ...config.headers, Authorization: `Bearer ${getToken()}` }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export async function getRequest(URL: string): Promise<any> {
    return axiosClient.get(`/${URL}`).then(response => response);
}

export function postRequest(URL: string, payload: Record<string, any>) {
    return axiosClient.post(`/${URL}`, payload).then(response => response);
}

export function patchRequest(URL: string, payload: Record<string, any>) {
    return axiosClient.patch(`/${URL}`, payload).then(response => response);
}

export function deleteRequest(URL: string) {
    return axiosClient.delete(`/${URL}`).then(response => response);
}

export default axiosClient;