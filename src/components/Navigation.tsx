import { NavLink } from 'react-router-dom';
import { routes } from '@/constants.ts';
import { Route } from '@/interfaces/Interface.Routes.ts';

export default function Navigation() {
    return (
        <ul>
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
