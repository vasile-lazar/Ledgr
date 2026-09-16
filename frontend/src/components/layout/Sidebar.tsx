import {
    Bot,
    ChartNoAxesCombined,
    CreditCard,
    FileText,
    LayoutDashboard,
    LogOut,
    Target,
    Upload
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import React from 'react';
import { NavLink } from 'react-router-dom';
import { PATHS } from '../../routes/paths';

interface NavItem {
    label: string;
    path: string;
    icon: LucideIcon;
}

const navItems: NavItem[] = [
    { label: 'Dashboard', path: PATHS.APP.DASHBOARD, icon: LayoutDashboard },
    { label: 'Upload Statement', path: PATHS.APP.UPLOAD, icon: Upload },
    { label: 'Statements', path: PATHS.APP.STATEMENTS, icon: FileText },
    { label: 'Transactions', path: PATHS.APP.TRANSACTIONS, icon: CreditCard },
    { label: 'Budgets', path: PATHS.APP.BUDGETS, icon: Target },
    { label: 'Analytics', path: PATHS.APP.ANALYTICS, icon: ChartNoAxesCombined },
    { label: 'AI Insights', path: PATHS.APP.INSIGHTS, icon: Bot },
];

export const Sidebar: React.FC = () => {
    return (
        <aside className="w-16 md:w-60 bg-sidebar border-r border-sidebar-border flex flex-col fixed inset-y-0 left-0 z-20 transition-colors">
            {/* Header / Brand area */}
            <div className="p-6 border-b border-sidebar-border flex items-center justify-center">
                <span className="font-bold text-lg md:text-3xl text-sidebar-accent-foreground text-center tracking-wide ">
                    Ledgr
                </span>
            </div>

            <nav className="flex-1 p-2 md:p-4 space-y-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        title={item.label}
                        aria-label={item.label}
                        to={item.path}
                        className={({ isActive }) =>
                            `w-full flex items-center space-x-3 px-2 md:px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                isActive
                                    ? 'bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-border'
                                    : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                            }`
                        }
                    >
                        <span><item.icon size={20} aria-hidden="true" className="shrink-0" /></span>
                        <span className="hidden md:inline">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-2 md:p-4 border-t border-sidebar-border">
                <NavLink
                    aria-label="Log out"
                    to={PATHS.PUBLIC.LANDING}
                    className="w-full flex items-center gap-3 text-left px-2 md:px-4 py-2 text-sm text-muted-foreground hover:text-destructive transition-colors"
                >
                    <LogOut size={18} aria-hidden="true" /> <span className="hidden md:inline">Log out</span>
                </NavLink>
            </div>
        </aside>
    );
};

export default Sidebar;