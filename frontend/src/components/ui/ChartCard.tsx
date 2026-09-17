import type { ReactNode } from 'react';

export interface ChartCardProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function ChartCard({ title, subtitle, action, children, className = '' }: ChartCardProps) {
  return (
    <div className={`rounded-2xl border border-border bg-card p-5 ${className}`}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <div className="text-[14px] font-semibold text-foreground">{title}</div>
          {subtitle && <div className="mt-0.5 text-[12px] text-muted-foreground">{subtitle}</div>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
