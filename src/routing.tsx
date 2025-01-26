import { createBrowserRouter } from 'react-router-dom';
import { routes } from './constants';
import Layout from './components/Layout';
import Home from './pages/Page.Home';
import About from './pages/Page.About';
import Login from './pages/Page.Login';
import PostPage from './pages/Page.Post';
import ProtectedRoute from './components/ProtectedRoute';

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
    {
        path: routes.Post.path,
        element: <PostPage />,
    },
];

export const router = createBrowserRouter([
    {
        path: routes.Home.path,
        element: <Layout />,
        children: children,
    },
]);
