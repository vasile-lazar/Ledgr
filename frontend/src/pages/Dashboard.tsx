import ChartCard from '../components/ui/ChartCard';
import PieChartCard from '../components/ui/PieChartCard';
import OverviewSection from "../sections/dashboard/OverviewSection";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

import { monthlyExpenses, categoryBreakdown, type Page } from "../data/mock";

export default function Dashboard({ onNavigate }: { onNavigate?: (page: Page) => void }) {
  void onNavigate;
  return (
      <div className="p-6 space-y-6">
        <OverviewSection />
        
        {/* Charts row */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <ChartCard
            title="Income vs Expenses"
            subtitle="last 6 months"
            action={
              <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#10b981]" />Income</span>
                <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#ef4444]" />Expenses</span>
              </div>
            }
            className="lg:col-span-2"
          >
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyExpenses} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} tickFormatter={(value) => `${(Number(value) / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--foreground)' }}
                  formatter={(value) => [`${Number(value).toLocaleString('ro')} RON`]}
                />
                <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <PieChartCard title="Spending by Category" subtitle="January 2024" data={categoryBreakdown} />
        </div>

        <ChartCard title="Monthly Expenses Trend" subtitle="Expense trend">
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={monthlyExpenses}>
              <defs>
                <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} tickFormatter={(value) => `${(Number(value) / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--foreground)' }}
                formatter={(value) => [`${Number(value).toLocaleString('ro')} RON`]}
              />
              <Area type="monotone" dataKey="expenses" stroke="#6366f1" strokeWidth={2} fill="url(#expGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        
      </div>
  );
}
