
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from "../ui/ThemeToggle.tsx";
import { PATHS } from '../../routes/paths';

import { Button } from '../ui/Button';
import Avatar from '../ui/Avatar';

export const Topbar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <header className="h-21.5 border-b border-border bg-background/80 backdrop-blur-md px-3 sm:px-8 flex items-center sticky top-0 z-10 transition-colors">
            <div className="flex items-center space-x-3 ml-auto">
                <ThemeToggle />
                <Button
                    variant="ghost"
                    size="md"
                    onClick={() => navigate(PATHS.APP.PROFILE)}
                    className="flex items-center space-x-2  h-9"
                >
                    <Avatar name="Gondon" size="sm" className="ring-2 ring-background" />
                    <span className="hidden sm:inline text-sm font-medium text-foreground pr-1">Gondon</span>
                </Button>
            </div>
        </header>
    );
};

export default Topbar;
