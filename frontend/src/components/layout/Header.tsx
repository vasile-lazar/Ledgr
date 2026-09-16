import { Bell } from "lucide-react";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from "../ui/ThemeToggle.tsx";
import { PATHS } from '../../routes/paths';

import { Button } from '../ui/Button';

export const Topbar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <header className="h-21.5 border-b border-border bg-background/80 backdrop-blur-md px-3 sm:px-8 flex items-center sticky top-0 z-10 transition-colors">
            <div className="flex items-center space-x-3 ml-auto">
                <ThemeToggle />
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(PATHS.APP.NOTIFICATIONS)}
                    className="p-2 h-9 w-9 text-muted-foreground hover:text-primary"
                    aria-label="Notifications"
                >
                    <Bell size={16} aria-hidden="true" />
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(PATHS.APP.PROFILE)}
                    className="flex items-center space-x-2 p-1.5 h-9"
                >
                    <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                        JD
                    </div>
                    <span className="hidden sm:inline text-sm font-medium text-foreground pr-1">Gondon</span>
                </Button>
            </div>
        </header>
    );
};

export default Topbar;
