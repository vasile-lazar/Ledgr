import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { PATHS } from './paths';

interface GuardProps {
    requireAuth?: boolean;
    publicOnly?: boolean;
    redirectTo?: string;
}

export const Guard: React.FC<GuardProps> = ({
                                                requireAuth = false,
                                                publicOnly = false,
                                                redirectTo,
                                            }) => {
    const location = useLocation();
    const { isAuthenticated } = useAuth();

    if (publicOnly && isAuthenticated) {
        return <Navigate to={redirectTo ?? PATHS.app.dashboard} replace />;
    }

    if (requireAuth && !isAuthenticated) {
        return (
            <Navigate
                to={redirectTo ?? PATHS.public.login}
                replace
                state={{ from: location }}
            />
        );
    }

    return <Outlet />;
};