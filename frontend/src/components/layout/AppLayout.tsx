// src/components/layout/AppLayout.tsx

import { Outlet} from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AppLayout() {
    
    return (
        <div className="min-h-screen bg-background text-foreground flex transition-colors duration-200">
            <Sidebar />

            <div className="flex-1 flex flex-col ml-16 md:ml-60 min-w-0 min-h-screen">
                <Header/>

                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}