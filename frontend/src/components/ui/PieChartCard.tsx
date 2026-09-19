import { Pie, PieChart, ResponsiveContainer, Sector, Tooltip } from 'recharts';

export interface PieChartCardProps {
    title: string;
    subtitle?: string;
    data: Array<{ name: string; value: number; color: string }>;
    valueFormatter?: (value: number) => string;
    limit?: number;
}

export const PieChartCard: React.FC<PieChartCardProps> = ({
                                                              title,
                                                              subtitle,
                                                              data,
                                                              valueFormatter = (value) => `${value.toFixed(0)} MDL`,
                                                              limit = 4,
                                                          }) => {
    return (
        <div className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-1 text-[14px] font-semibold text-foreground">{title}</div>
            {subtitle && <div className="mb-4 text-[12px] text-muted-foreground">{subtitle}</div>}

            <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={2}
                        startAngle={90}
                        endAngle={-270}
                        shape={(props: any) => (
                            <Sector {...props} fill={data[props.index]?.color} />
                        )}
                    />
                    <Tooltip
                        contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--foreground)' }}
                        formatter={(value) => [valueFormatter(Number(value))]}
                    />
                </PieChart>
            </ResponsiveContainer>

            <div className="mt-2 space-y-2">
                {data.slice(0, limit).map((entry) => (
                    <div key={entry.name} className="flex items-center justify-between text-[12px]">
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                            <span className="text-muted-foreground">{entry.name}</span>
                        </div>
                        <span className="font-mono text-muted-foreground">{valueFormatter(entry.value)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};