import { Outlet } from 'react-router-dom';

export const AuthLayout: React.FC = () => {
    return (
        <div className="min-h-screen w-full bg-background bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(14,116,144,0.10),transparent_32%)] px-4 py-8 text-foreground flex flex-col">
            <Outlet />
        </div>
    );
};