import { StatCard } from '../../components/ui/StatCard';
import { useDashboardData } from '../../hooks/useDashboardData';
import { useOverviewStats } from '../../hooks/useOverviewStats';

export const OverviewSection: React.FC = () => {
    const { monthlyExpenses, isLoading } = useDashboardData();
    const kpis = useOverviewStats(monthlyExpenses);

    if (isLoading) {
        return <div className="text-sm text-muted-foreground">Loading…</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {kpis.map((kpi) => (
                <StatCard key={kpi.label} label={kpi.label} value={kpi.value} unit={kpi.unit} />
            ))}
        </div>
    );
};