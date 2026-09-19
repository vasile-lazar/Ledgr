import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from '../layout/AppLayout';
import { AuthLayout } from '../layout/AuthLayout';
import { Guard } from './Guard';
import { PATHS } from './paths';

import { Landing } from '../pages/Landing';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Dashboard } from '../pages/Dashboard';
import { UploadPage } from '../pages/UploadPage';
import { Statements } from '../pages/Statements';
import { Transactions } from '../pages/Transactions';
import { Budgets } from '../pages/Budgets';
import { Profile } from '../pages/Profile';
import { NotFound } from '../pages/NotFound';

const router = createBrowserRouter([
    { path: PATHS.public.landing, element: <Landing /> },

    // Auth pages — redirect away if already logged in
    {
        element: <Guard publicOnly />,
        children: [
            {
                element: <AuthLayout />,
                children: [
                    { path: PATHS.public.login, element: <Login /> },
                    { path: PATHS.public.register, element: <Register /> },
                ],
            },
        ],
    },

    // Authenticated app
    {
        element: <Guard requireAuth />,
        children: [
            {
                element: <AppLayout />,
                children: [
                    { path: PATHS.app.dashboard, element: <Dashboard /> },
                    { path: PATHS.app.upload, element: <UploadPage /> },
                    { path: PATHS.app.statements, element: <Statements /> },
                    { path: PATHS.app.transactions, element: <Transactions /> },
                    { path: PATHS.app.budgets, element: <Budgets /> },
                    { path: PATHS.app.profile, element: <Profile /> },
                ],
            },
        ],
    },

    { path: '*', element: <NotFound /> },
]);

export const AppRoutes: React.FC = () => <RouterProvider router={router} />;