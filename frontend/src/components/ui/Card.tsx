// src/components/ui/Card.tsx
import React from 'react';

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <div className={`bg-card border border-border rounded-xl p-5 transition-colors shadow-none font ${className}`}>
        {children}
    </div>
);

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <div className={`flex justify-between items-center border-b border-border pb-3 mb-4 ${className}`}>{children}</div>
);

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <h3 className={`font-semibold text-card-foreground ${className}`}>{children}</h3>
);