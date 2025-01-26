import { useUserStore } from '../stores/Store.UserStore';

export default function About({ title }: { title: string }) {
    const userStore = useUserStore();

    return (
        <>
            <section>
                <h1>
                    {title} {userStore.userNiceName}
                </h1>
                <p>Här kan du se en lista över dina blogginlägg och hantera dem.</p>
            </section>

            <section>
                <h2>Blogginlägg</h2>

                Blogginlägg
            </section>
        </>
    );
}
