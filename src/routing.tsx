import { createBrowserRouter } from 'react-router-dom';
import { routes } from '@/constants';
import Layout from './components/Layout';
import Home from './pages/Page.Home';
import About from './pages/Page.About';
import Login from './pages/Page.Login';
import ProtectedRoute from './components/ProtectedRoute';
import { useUserStore } from './stores/Store.UserStore';

const children = [
    {
        path: routes.Home.path,
        element: <Home title={routes.Home.text} />,
    },
    {
        path: routes.About.path,
        element: (
            <ProtectedRoute>
                <About title={routes.About.text} />
            </ProtectedRoute>
        ),
    },
    {
        path: routes.Login.path,
        element: <Login title={routes.Login.text} />,
    },
];

export const router = createBrowserRouter([
    {
        path: routes.Home.path,
        element: <Layout />,
        children: children,
    },
]);
