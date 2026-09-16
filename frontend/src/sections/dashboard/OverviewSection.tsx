import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import StatCard from '../../components/ui/StatCard';
const kpis = [
  { label: "Total Income", value: "10.500", unit: "RON", delta: "+8.2%", up: true, color: "#10b981" },
  { label: "Total Expenses", value: "5.040", unit: "RON", delta: "-3.1%", up: false, color: "#ef4444" },
  { label: "Savings", value: "5.460", unit: "RON", delta: "+14.2%", up: true, color: "#6366f1" },
  { label: "Savings Rate", value: "52", unit: "%", delta: "+6pp", up: true, color: "#f59e0b" },
];


export default function OverviewSection() { return <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">{kpis.map(kpi => <StatCard key={kpi.label} label={kpi.label} value={kpi.value} unit={kpi.unit} footer={<span className={kpi.up ? 'text-primary' : 'text-destructive'}>{kpi.up ? <ArrowUpRight size={13} className="inline" /> : <ArrowDownRight size={13} className="inline" />} {kpi.delta} vs luna trecută</span>} />)}</div>; }