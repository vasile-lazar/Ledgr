import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { BudgetCard } from '../components/ui/BudgetCard';

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { budgets } from "../data/mock";



export default function Budgets() {
  const [showForm, setShowForm] = useState(false);
  const [newCat, setNewCat] = useState("");
  const [newLimit, setNewLimit] = useState("");

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <Button variant="primary" size="custom"
          onClick={() => setShowForm(true)}
          className="flex ml-full gap-2 px-4 py-2.5 rounded-xl text-[13.5px] font-medium"
        >
          <Plus size={15} /> New budget
        </Button>
      </div>

      {/* Budget cards grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {budgets.map(b => (
          <BudgetCard
            key={b.category}
            category={b.category}
            spent={b.spent}
            limit={b.limit}
            color={b.color}
            icon={b.icon}
          />
        ))}
      </div>
      

      {/* Create form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)}>
          <div className="bg-card border border-border rounded-2xl p-6 w-96 shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <div className="text-[15px] font-semibold text-foreground">New budget</div>
              <Button aria-label="Close" variant="unstyled" size="custom" onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-muted-foreground"><X size={16} /></Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[12px] text-muted-foreground mb-1.5">Category</label>
                <select
                  value={newCat}
                  onChange={e => setNewCat(e.target.value)}
                  className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-[13.5px] text-foreground outline-none focus:border-[#10b981] transition-colors"
                >
                  <option value="">Select...</option>
                  <option>Groceries</option><option>Restaurants</option><option>Shopping</option>
                  <option>Transport</option><option>Subscriptions</option><option>Home</option><option>Altele</option>
                </select>
              </div>
              <div>
                <label htmlFor="budget-limit" className="block text-[12px] text-muted-foreground mb-1.5">Monthly limit (RON)</label>
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
                Create budget
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
