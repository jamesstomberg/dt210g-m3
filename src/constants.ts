import { ApiConfig } from './interfaces/Interface.ApiConfig';
import { Routes } from './interfaces/Interface.Routes';
import { ValidationSchemas } from './interfaces/Interface.ValidationSchemas';
import * as Yup from 'yup';

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

export const validation: ValidationSchemas = {
    loginForm: Yup.object({
        username: Yup.string().required('Du måste ange användarnamn'),
        password: Yup.string().required('Du måste ange lösenord').min(4, 'Lösenord måste vara minst 4 tecken'),
    }),
};

export const zustandUserStorageName = 'dt210g-m3-storage';
