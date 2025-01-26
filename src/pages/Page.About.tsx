import { useUserStore } from '../stores/Store.UserStore';
import Posts from '../components/Posts';

export default function About({ title }: { title: string }) {
    const userStore = useUserStore();
    let optionalParams = {};

    if (userStore.isLoggedIn) {
        optionalParams = {
            ...optionalParams,
            author: userStore.userID,
        };
    }

    return (
        <>
            <section>
                <h1>{title}</h1>

                <div>
                    <h2>Hej {userStore.userDisplayName}</h2>
                    <p>Här kan du se en lista över dina blogginlägg och hantera dem.</p>
                </div>
            </section>

            <section>
                <Posts optionalParams={optionalParams} optionalTitle="Mina inlägg" />
            </section>
        </>
    );
}
