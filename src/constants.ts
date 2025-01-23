import { ApiConfig } from './interfaces/Interface.ApiConfig';
import { Routes } from './interfaces/Interface.Routes';

export const routes: Routes = {
    Home: {
        path: '/',
        text: 'Start',
    },
    About: {
        path: '/om',
        text: 'Om',
    },
    Login: {
        path: '/logga-in',
        text: 'Logga in',
    },
};

export const api: ApiConfig = {
    baseURL: 'https://vanilla.test/wp-json',
    authTokenStorageKey: 'dt210gJWTauthToken',
};
