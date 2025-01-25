export default function Home({ title }: { title: string }) {
    return (
        <>
            <section>
                <h1>{title}</h1>
                <p>Välkommen till den personliga bloggplattformen för James Stomberg. Ta gärna del av mina blogginlägg nedan.</p>
            </section>

            <section>
                Blogginlägg
            </section>
        </>
    );
}
