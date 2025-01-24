import { NavLink } from 'react-router-dom';
import { routes } from '../constants';
import { Route } from '../interfaces/Interface.Routes';
import '@/assets/scss/Navigation.scss';

export default function Navigation() {
    return (
        <ul className="site-navigation">
            {Object.entries(routes).map(([key, route]) => {
                const typedRoute = route as Route;

                return (
                    <li key={key}>
                        <NavLink to={typedRoute.path}>{typedRoute.text}</NavLink>
                    </li>
                );
            })}
        </ul>
    );
}
