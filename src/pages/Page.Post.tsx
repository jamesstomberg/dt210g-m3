import Posts from '../components/Posts';

export default function PostPage({ title }: { title: string }) {
    return (
        <>
            <h1>{title}</h1>
            <Posts />
        </>
    );
}
