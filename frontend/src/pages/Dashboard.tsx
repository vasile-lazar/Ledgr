import { Button } from '../components/ui/Button';
import Table, { TableBody, TableCell, TableRow } from '../components/ui/Table';
import OverviewSection from "../sections/dashboard/OverviewSection";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { TrendingUp, Upload, PlusCircle, Target } from "lucide-react";
import { transactions, monthlyExpenses, categoryBreakdown } from "../data/mock";
import type { Page } from "../data/mock";

interface DashboardProps {
  onNavigate: (page: Page) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
      <div className="p-6 space-y-6">
        <OverviewSection />

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Income vs Expenses */}
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-[14px] font-semibold text-foreground">Income vs Expenses</div>
                <div className="text-[12px] text-muted-foreground mt-0.5">Ultimele 6 luni</div>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#10b981] inline-block" />Income</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#ef4444] inline-block" />Expenses</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyExpenses} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
                <Tooltip
                    contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", color: "var(--foreground)" }}
                    formatter={(v) => [`${Number(v).toLocaleString("ro")} RON`]}
                />
                <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category pie */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="text-[14px] font-semibold text-foreground mb-1">Spending by Category</div>
            <div className="text-[12px] text-muted-foreground mb-4">Ianuarie 2024</div>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={categoryBreakdown} dataKey="value" innerRadius={45} outerRadius={70} paddingAngle={2} startAngle={90} endAngle={-270}>
                  {categoryBreakdown.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                    contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", color: "var(--foreground)" }}
                    formatter={(v) => [`${Number(v).toFixed(0)} RON`]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {categoryBreakdown.slice(0, 4).map(c => (
                  <div key={c.name} className="flex items-center justify-between text-[12px]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                      <span className="text-muted-foreground">{c.name}</span>
                    </div>
                    <span className="font-mono text-muted-foreground">{c.value.toFixed(0)} RON</span>
                  </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly trend */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-[14px] font-semibold text-foreground">Monthly Expenses Trend</div>
              <div className="text-[12px] text-muted-foreground mt-0.5">Evoluție cheltuieli</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={monthlyExpenses}>
              <defs>
                <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip
                  contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", color: "var(--foreground)" }}
                  formatter={(v) => [`${Number(v).toLocaleString("ro")} RON`]}
              />
              <Area type="monotone" dataKey="expenses" stroke="#6366f1" strokeWidth={2} fill="url(#expGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Recent transactions */}
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[14px] font-semibold text-foreground">Recent Transactions</div>
              <Button variant="link" size="custom" onClick={() => onNavigate("transactions")} className="text-[12px]">View all</Button>
            </div>

            <Table caption="Recent Transactions" density="compact">
              <TableBody>
                {transactions.slice(0, 6).map((tx) => {
                  const Icon = tx.icon;
                  return (
                      <TableRow key={tx.id} className="cursor-pointer">
                        <TableCell className="font-medium text-foreground">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                              <Icon size={16} aria-hidden="true" className="shrink-0 text-muted-foreground" />
                            </div>
                            <span className="truncate">{tx.merchant}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{tx.category}</TableCell>
                        <TableCell className="text-muted-foreground">{tx.date}</TableCell>
                        <TableCell className="text-right">
                      <span className={`font-mono text-[13px] font-medium ${tx.amount > 0 ? "text-[#10b981]" : "text-foreground"}`}>
                        {tx.amount > 0 ? "+" : ""}{tx.amount.toFixed(2)} RON
                      </span>
                        </TableCell>
                      </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Quick actions */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="text-[14px] font-semibold text-foreground mb-4">Quick Actions</div>
            <div className="space-y-3">
              {[
                { icon: Upload, label: "Upload Statement", page: "upload" as Page, primary: true },
                { icon: PlusCircle, label: "Add Transaction", page: "transactions" as Page },
                { icon: Target, label: "Create Budget", page: "budgets" as Page },
                { icon: TrendingUp, label: "View Analytics", page: "analytics" as Page },
              ].map(({ icon: Icon, label, page, primary }) => (
                  <Button variant="unstyled" size="custom"
                          key={label}
                          onClick={() => onNavigate(page)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[13.5px] font-medium transition-colors ${
                              primary
                                  ? "bg-[#10b981] text-white hover:bg-[#059669]"
                                  : "border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                  >
                    <Icon size={15} />
                    {label}
                  </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}
