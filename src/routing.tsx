import { createBrowserRouter } from 'react-router-dom';
import { routes } from '@/constants';
import Layout from './components/Layout';
import Home from './pages/Page.Home';
import About from './pages/Page.About';
import Login from './pages/Page.Login';

export const router = createBrowserRouter([
    {
        path: routes.Home.path,
        element: <Layout />,
        children: [
            {
                path: routes.Home.path,
                element: <Home title={routes.Home.text}/>,
            },
            {
                path: routes.About.path,
                element: <About title={routes.About.text}/>,
            },
            {
                path: routes.Login.path,
                element: <Login title={routes.Login.text}/>,
            },
        ],
    },
]);
