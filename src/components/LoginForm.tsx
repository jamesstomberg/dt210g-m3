import { useState } from 'react';
import { apiPost } from '../utils';
import { validation, api } from '../constants';
import * as Yup from 'yup';
import '@/assets/scss/LoginForm.scss';
import { useUserStore } from '../stores/Store.UserStore';
import { Navigate } from 'react-router-dom';
import { routes } from '../constants';

export default function LoginForm() {
    const userStore = useUserStore();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const login = async (postData: object) => {
        const data = await apiPost<{ token: string; user_nicename: string; user_email: string }>(
            '/jwt-auth/v1/token',
            {
                ...postData,
            }
        );

        return data;
    };

    const validateLoginForm = async (data: object): Promise<boolean> => {
        try {
            await validation.loginForm.validate(data, { abortEarly: false });
            setErrors([]);

            return true;
        } catch (error: unknown) {
            if (error instanceof Yup.ValidationError) {
                setErrors(error.errors);
            }
            return false;
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const postData = {
            username: username,
            password: password,
        };

        const isValid = await validateLoginForm(postData);

        if (!isValid) {
            return;
        }

        try {
            const data = await login(postData);

            if (data.token && data.user_nicename && data.user_email) {
                localStorage.setItem(api.authTokenStorageKey, data.token);
                userStore.setUser(data.user_nicename, data.user_email);
            }
        } catch {
            setErrors(['Något gick fel! Kontrollera dina uppgifter eller försök igen senare.']);
        }
    };

    if (userStore.isLoggedIn) {
        return <Navigate to={routes.About.path} replace />;
    }

    return (
        <form className="login-form">
            <div className="login-form__errors">
                {errors && (
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                )}
            </div>
            <div>
                <label htmlFor="username">Användarnamn eller E-post</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Lösenord</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <input type="submit" value="Logga in" onClick={handleSubmit} />
        </form>
    );
}
