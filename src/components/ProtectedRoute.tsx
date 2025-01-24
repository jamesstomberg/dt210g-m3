import { Navigate } from 'react-router-dom';
import { ProtectedRouteProps } from '../interfaces/Interface.ProtectedRouteProps';
import { useUserStore } from '../stores/Store.UserStore';
import { routes } from '../constants';

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const isLoggedIn = useUserStore((state) => state.isLoggedIn);

    if (!isLoggedIn) {
        return <Navigate to={routes.Login.path} replace />;
    }

    return <>{children}</>;
}
