import { ApiConfig } from './interfaces/Interface.ApiConfig';
import { Routes } from './interfaces/Interface.Routes';
import { ValidationSchemas } from './interfaces/Interface.ValidationSchemas';
import * as Yup from 'yup';

export const routes: Routes = {
    Home: {
        path: '/',
        text: 'Start',
        protected: false,
        navigation: true,
    },
    About: {
        path: '/om',
        text: 'Om',
        protected: true,
        navigation: true,
    },
    Post: {
        path: '/post',
        text: 'Inlägg',
        protected: false,
        navigation: true,
    },
    Login: {
        path: '/logga-in',
        text: 'Logga in',
        protected: false,
        navigation: true,
    },
    EditPost: {
        path: '/edit-post',
        text: 'Redigera inlägg',
        protected: true,
        navigation: false,
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

    postForm: Yup.object({
        postID: Yup.number().required('Ogiltigt ID för inlägg.'),
        post_title: Yup.string()
            .required('Du måste ange en titel')
            .min(3, 'Titel måste vara minst 3 tecken'),
        post_content: Yup.string()
            .required('Du måste ange ett innehåll')
            .min(10, 'Innehåll måste vara minst 10 tecken'),
    }),
};

export const zustandUserStorageName = 'dt210g-m3-storage';
