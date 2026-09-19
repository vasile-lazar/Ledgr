import type { ComponentType, SVGProps } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card } from './Card';

export interface BudgetCardProps {
    category: string;
    spent: number;
    limit: number;
    color?: string;
    icon?: ComponentType<SVGProps<SVGSVGElement>>;
}

export const BudgetCard: React.FC<BudgetCardProps> = ({
                                                          category,
                                                          spent,
                                                          limit,
                                                          color = '#10b981',
                                                          icon: Icon,
                                                      }) => {
    const pct = Math.round((spent / limit) * 100);
    const over = pct > 100;

    return (
        <Card>
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2.5">
                    {Icon && (
                        <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-base">
                            <Icon aria-hidden={true} className="shrink-0 text-foreground size-5" />
                        </div>
                    )}
                    <div>
                        <div className="text-[13.5px] font-semibold text-foreground">{category}</div>
                        <div className="text-[11px] text-muted-foreground">Monthly</div>
                    </div>
                </div>
                {over && <AlertTriangle size={14} className="text-[#ef4444] shrink-0 mt-1" />}
            </div>

            <div className="flex items-baseline justify-between mb-2">
                <span className="font-mono text-[22px] font-semibold text-foreground">
                    {spent.toLocaleString()}
                </span>
                <span className="text-[13px] text-muted-foreground">
                    / {limit.toLocaleString()} MDL
                </span>
            </div>

            <div className="h-2 rounded-full bg-muted mb-2 overflow-hidden">
                <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                        width: `${Math.min(pct, 100)}%`,
                        backgroundColor: over ? '#ef4444' : color,
                    }}
                />
            </div>

            <div
                className={`text-[12px] font-medium ${
                    over
                        ? 'text-[#ef4444]'
                        : pct > 80
                            ? 'text-[#f59e0b]'
                            : 'text-muted-foreground'
                }`}
            >
                {pct}% used {over ? '— over budget!' : ''}
            </div>
        </Card>
    );
};