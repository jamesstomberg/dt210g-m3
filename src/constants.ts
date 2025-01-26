import { ApiConfig } from './interfaces/Interface.ApiConfig';
import { Routes } from './interfaces/Interface.Routes';
import { ValidationSchemas } from './interfaces/Interface.ValidationSchemas';
import * as Yup from 'yup';

export const routes: Routes = {
    Home: {
        path: '/',
        text: 'Start',
        protected: false,
    },
    About: {
        path: '/om',
        text: 'Om',
        protected: true,
    },
    Post: {
        path: '/post',
        text: 'Inlägg',
        protected: false,
    },
    Login: {
        path: '/logga-in',
        text: 'Logga in',
        protected: false,
    },
};

export const api: ApiConfig = {
    baseURL: 'https://vanilla.test/wp-json',
    authTokenStorageKey: 'dt210gJWTauthToken',
    getPostsURL: '/wp/v2/posts',
};

export const validation: ValidationSchemas = {
    loginForm: Yup.object({
        username: Yup.string().required('Du måste ange användarnamn'),
        password: Yup.string()
            .required('Du måste ange lösenord')
            .min(4, 'Lösenord måste vara minst 4 tecken'),
    }),
};

export const zustandUserStorageName = 'dt210g-m3-storage';

export const zustandPostsStorageName = 'dt210g-m3-posts-storage';
