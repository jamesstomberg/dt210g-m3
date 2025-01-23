import LoginForm from '../components/LoginForm';

export default function Login({ title }: { title: string }) {
    return (
        <section>
            <h1>{title}</h1>

            <LoginForm />
        </section>
    );
}
