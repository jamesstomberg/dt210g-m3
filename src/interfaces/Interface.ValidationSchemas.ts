import * as Yup from 'yup';

export interface ValidationSchema {
    [key: string]: Yup.AnySchema;
}

export interface ValidationSchemas {
    loginForm: Yup.ObjectSchema<{
        username: string;
        password: string;
    }>;

    postForm: Yup.ObjectSchema<{
        postID: number|null;
        post_title: string;
        post_content: string;
    }>;

    // Add more forms as needed.
    [key: string]: Yup.ObjectSchema<any>;
}
