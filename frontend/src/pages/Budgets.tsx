import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import Table, { TableHeader, TableBody, TableRow, TableHead, TableCell } from "../components/ui/Table";
import { useState } from "react";
import { Plus, X, AlertTriangle } from "lucide-react";
import { budgets } from "../data/mock";

const historyData = [
  { month: "Oct", Food: 78, Shopping: 95, Transport: 82 },
  { month: "Nov", Food: 91, Shopping: 112, Transport: 67 },
  { month: "Dec", Food: 105, Shopping: 134, Transport: 88 },
  { month: "Ian", Food: 80, Shopping: 120, Transport: 85 },
];

export default function Budgets() {
  const [showForm, setShowForm] = useState(false);
  const [newCat, setNewCat] = useState("");
  const [newLimit, setNewLimit] = useState("");

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-[28px] font-light text-foreground tracking-tight">Budgets</h2>
          <p className="text-[13.5px] text-muted-foreground mt-1">Monitorizează cheltuielile pe categorii</p>
        </div>
        <Button variant="primary" size="custom"
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13.5px] font-medium"
        >
          <Plus size={15} /> Buget nou
        </Button>
      </div>

      {/* Budget cards grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {budgets.map(b => {
          const pct = Math.round((b.spent / b.limit) * 100);
          const over = pct > 100;
          return (
            <div key={b.category} className={`bg-card border rounded-2xl p-5 ${over ? "border-[#ef4444]/30" : "border-border"}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-base"><b.icon size={20} aria-hidden="true" className="shrink-0" /></div>
                  <div>
                    <div className="text-[13.5px] font-semibold text-foreground">{b.category}</div>
                    <div className="text-[11px] text-muted-foreground">Lunar</div>
                  </div>
                </div>
                {over && <AlertTriangle size={14} className="text-[#ef4444] shrink-0 mt-1" />}
              </div>

              <div className="flex items-baseline justify-between mb-2">
                <span className="font-mono text-[22px] font-semibold text-foreground">{b.spent.toLocaleString()}</span>
                <span className="text-[13px] text-muted-foreground">/ {b.limit.toLocaleString()} RON</span>
              </div>

              <div className="h-2 rounded-full bg-muted mb-2 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(pct, 100)}%`,
                    backgroundColor: over ? "#ef4444" : b.color,
                  }}
                />
              </div>

              <div className={`text-[12px] font-medium ${over ? "text-[#ef4444]" : pct > 80 ? "text-[#f59e0b]" : "text-muted-foreground"}`}>
                {pct}% utilizat {over ? "— depășit!" : ""}
              </div>
            </div>
          );
        })}
      </div>

      {/* History table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <div className="text-[14px] font-semibold text-foreground">Budget History</div>
          <div className="text-[12px] text-muted-foreground mt-0.5">Performanță pe luni (%)</div>
        </div>
        <Table caption="Budget history by month (%)">
          <TableHeader>
            <TableRow>
              <TableHead>Lună</TableHead>
              {["Food", "Shopping", "Transport"].map(c => (
                <TableHead key={c} >{c}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {historyData.map(row => (
              <TableRow key={row.month} >
                <TableCell className="font-medium text-foreground">{row.month}</TableCell>
                {[row.Food, row.Shopping, row.Transport].map((val, i) => (
                  <TableCell key={i} >
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${Math.min(val, 100)}%`, backgroundColor: val > 100 ? "#ef4444" : "#10b981" }}
                        />
                      </div>
                      <span className={`font-mono text-[12px] w-10 ${val > 100 ? "text-[#ef4444]" : "text-muted-foreground"}`}>{val}%</span>
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Create form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)}>
          <div className="bg-card border border-border rounded-2xl p-6 w-96 shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <div className="text-[15px] font-semibold text-foreground">Buget nou</div>
              <Button aria-label="Close" variant="unstyled" size="custom" onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-muted-foreground"><X size={16} /></Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[12px] text-muted-foreground mb-1.5">Categorie</label>
                <select
                  value={newCat}
                  onChange={e => setNewCat(e.target.value)}
                  className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-[13.5px] text-foreground outline-none focus:border-[#10b981] transition-colors"
                >
                  <option value="">Selectează...</option>
                  <option>Groceries</option><option>Restaurants</option><option>Shopping</option>
                  <option>Transport</option><option>Subscriptions</option><option>Home</option><option>Altele</option>
                </select>
              </div>
              <div>
                <label htmlFor="budget-limit" className="block text-[12px] text-muted-foreground mb-1.5">Limită lunară (RON)</label>
                <Input
                  id="budget-limit" type="number"
                  value={newLimit}
                  onChange={e => setNewLimit(e.target.value)}
                  placeholder="1000"
                  className="text-[13.5px] font-mono"
                />
              </div>
              <Button variant="primary" size="custom"
                onClick={() => setShowForm(false)}
                className="w-full py-3 rounded-xl text-[13.5px] font-medium mt-2"
              >
                Creează buget
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
