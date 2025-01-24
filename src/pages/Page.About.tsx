import { useUserStore } from '../stores/Store.UserStore';

export default function About({ title }: { title: string }) {
    const userStore = useUserStore();
    return <h1>{title} {userStore.userNiceName}</h1>;
}
