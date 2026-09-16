// src/components/ui/Badge.tsx
import React from 'react';

export interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'success' | 'destructive' | 'outline';
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
    const variants = {
        default: 'bg-accent text-accent-foreground border-border',
        success: 'bg-primary/20 text-primary border-primary/30',
        destructive: 'bg-destructive/20 text-destructive border-destructive/30',
        outline: 'bg-transparent text-muted-foreground border-border',
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}>
      {children}
    </span>
    );
};