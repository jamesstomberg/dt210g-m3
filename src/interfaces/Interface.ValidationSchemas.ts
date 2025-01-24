import * as Yup from 'yup';

export interface ValidationSchema {
    [key: string]: Yup.AnySchema;
}

export interface ValidationSchemas {
    loginForm: Yup.ObjectSchema<{
        username: string;
        password: string;
    }>;

    // Add more forms as needed.
    [key: string]: Yup.ObjectSchema<any>;
}
