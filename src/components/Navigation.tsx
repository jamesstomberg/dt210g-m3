import { NavLink } from 'react-router-dom';
import { routes } from '../constants';
import { Route } from '../interfaces/Interface.Routes';
import '@/assets/scss/Navigation.scss';
import { useUserStore } from '../stores/Store.UserStore';

export default function Navigation() {
    const userStore = useUserStore();

    return (
        <ul className="site-navigation">
            {Object.entries(routes).map(([key, route]) => {
                const typedRoute = route as Route;

                if (
                    (userStore.isLoggedIn && key === 'Login') ||
                    (!userStore.isLoggedIn && typedRoute.protected) ||
                    !route.navigation
                ) {
                    return;
                }

                return (
                    <li key={key}>
                        <NavLink to={typedRoute.path}>{typedRoute.text}</NavLink>
                    </li>
                );
            })}
            {userStore.isLoggedIn && (
                <li>
                    <button onClick={userStore.logout}>Logga ut</button>
                </li>
            )}
        </ul>
    );
}
