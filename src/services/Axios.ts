import axios from 'axios'
import { auth } from '.';
import { storedUser } from './FireAuthService';

import createAuthRefreshInterceptor from 'axios-auth-refresh';

// Function that will be called to refresh authorization
const refreshAuthLogic = async (failedRequest: any) => {
    const newToken = auth.currentUser && await auth.currentUser.getIdToken(true);
    if (!newToken) {
        return Promise.reject('No current user');
    }
    const user = storedUser();
    if (!user) {
        return Promise.reject('No stored user');
    }
    user.stsTokenManager.accessToken = newToken;
    localStorage.setItem('user', JSON.stringify(user));
    failedRequest.response.config.headers['Authorization'] = `Bearer ${newToken as string}`;
    return Promise.resolve();
};

// Instantiate the interceptor
createAuthRefreshInterceptor(axios, refreshAuthLogic);

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    responseType: "json",
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
    timeout: 2000
});


async function getToken(): Promise<string> {
    const user = storedUser();
    if (user) {
        return user.stsTokenManager.accessToken;
    }
    throw new Error('No user found');
}

async function getAuthorizedConfig(authNeeded: boolean): Promise<any> {
    const config: any = authNeeded ? {
        headers: {
            Authorization: `Bearer ${await getToken()}`
        }
    } as any : {};
    return config;
}

export async function getRequest(URL: string, authNeeded = true): Promise<any> {
    const config = await getAuthorizedConfig(authNeeded);
    return axiosClient.get(`/${URL}`, config).then(response => response);
}

export async function postRequest(URL: string, payload: Record<string, any>, authNeeded = true) {
    const config = await getAuthorizedConfig(authNeeded);
    return axiosClient.post(`/${URL}`, payload, config).then(response => response);
}

export async function patchRequest(URL: string, payload: Record<string, any>, authNeeded = true) {
    const config = await getAuthorizedConfig(authNeeded);
    return axiosClient.patch(`/${URL}`, payload, config).then(response => response);
}

export async function deleteRequest(URL: string, authNeeded = true) {
    const config = await getAuthorizedConfig(authNeeded);
    return axiosClient.delete(`/${URL}`, config).then(response => response);
}

export default axiosClient;