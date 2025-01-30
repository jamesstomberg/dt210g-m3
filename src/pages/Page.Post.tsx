import Posts from '../components/Posts';

export default function PostPage({ title }: { title: string }) {
    return (
        <>
            <section>
                <h1>{title}</h1>
                <p>Här kan du se alla blogginlägg.</p>
            </section>
            <Posts />
        </>
    );
}
