import { NavLink } from 'react-router-dom';
import { routes } from '@/constants.ts';

export default function Navigation() {
    return (
        <ul>
            <li>
                <NavLink to={routes.Home.path}>{routes.Home.text}</NavLink>
            </li>
            <li>
                <NavLink to={routes.About.path}>{routes.About.text}</NavLink>
            </li>
            <li>
                <NavLink to={routes.Login.path}>{routes.Login.text}</NavLink>
            </li>
        </ul>
    );
}
