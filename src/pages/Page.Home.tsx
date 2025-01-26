import Posts from '../components/Posts';

export default function Home({ title }: { title: string }) {
    return (
        <>
            <section>
                <h1>{title}</h1>
                <p>
                    Välkommen till Bloggen. Ta gärna del av de senaste blogginläggen nedan. Vill du
                    läsa mer gå till sidan för inlägg.
                </p>
            </section>

            <Posts optionalTitle="Senaste inläggen" optionalParams={{per_page: 2}} />
        </>
    );
}
