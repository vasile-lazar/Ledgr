import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { BudgetCard } from '../components/ui/BudgetCard';

import {type ComponentType, type SVGProps, useState} from 'react';
import { Plus, X } from 'lucide-react';
import { useBudgets } from '../hooks/useBudgets';
import type { TransactionCategory } from '../types';

import { CATEGORY_STYLE } from '../constants/categoryStyle';
import {
    ShoppingCartIcon, TruckIcon, BanknotesIcon, FilmIcon,
    CakeIcon, ShoppingBagIcon, BoltIcon, EllipsisHorizontalCircleIcon,
} from '@heroicons/react/24/outline';

const CATEGORY_ICON: Record<TransactionCategory, ComponentType<SVGProps<SVGSVGElement>>> = {
    Groceries: ShoppingCartIcon,
    Transport: TruckIcon,
    Salary: BanknotesIcon,
    Entertainment: FilmIcon,
    Dining: CakeIcon,
    Shopping: ShoppingBagIcon,
    Utilities: BoltIcon,
    Other: EllipsisHorizontalCircleIcon,
};
// Backend enum is fixed — these are the only valid values, not free text.
const CATEGORIES: TransactionCategory[] = [
    'Groceries', 'Transport', 'Salary', 'Entertainment',
    'Dining', 'Shopping', 'Utilities', 'Other',
];

export const Budgets: React.FC = () => {
    const { budgets, isLoading, create } = useBudgets();
    const [showForm, setShowForm] = useState(false);
    const [newCat, setNewCat] = useState<TransactionCategory | ''>('');
    const [newLimit, setNewLimit] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCreate = async () => {
        if (!newCat || !newLimit) return;
        setIsSubmitting(true);
        try {
            await create(newCat, Number(newLimit));
            setShowForm(false);
            setNewCat('');
            setNewLimit('');
        } finally {
            setIsSubmitting(false);
        }
    };

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

            {isLoading && <p className="text-sm text-muted-foreground">Loading budgets…</p>}

            {!isLoading && budgets.length === 0 && (
                <p className="text-sm text-muted-foreground">No budgets set for this month yet.</p>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                {budgets.map((b) => (
                    <BudgetCard
                        key={b.id}
                        category={b.category}
                        spent={b.used}
                        limit={b.amount}
                        color={CATEGORY_STYLE[b.category].color}
                        icon={CATEGORY_ICON[b.category]}
                    />
                ))}
            </div>

            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                     onClick={() => setShowForm(false)}>
                    <div className="bg-card border border-border rounded-2xl p-6 w-96 shadow-xl"
                         onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-5">
                            <div className="text-[15px] font-semibold text-foreground">New budget</div>
                            <Button aria-label="Close" variant="unstyled" size="custom"
                                    onClick={() => setShowForm(false)}
                                    className="text-muted-foreground hover:text-muted-foreground"><X size={16} /></Button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[12px] text-muted-foreground mb-1.5">Category</label>
                                <select
                                    value={newCat}
                                    onChange={(e) => setNewCat(e.target.value as TransactionCategory)}
                                    className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-[13.5px] text-foreground outline-none transition-colors"
                                >
                                    <option value="">Select...</option>
                                    {CATEGORIES.map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="budget-limit" className="block text-[12px] text-muted-foreground mb-1.5">
                                    Monthly limit (MDL)
                                </label>
                                <Input
                                    id="budget-limit" type="number"
                                    value={newLimit}
                                    onChange={(e) => setNewLimit(e.target.value)}
                                    placeholder="1000"
                                    className="text-[13.5px] font-mono"
                                />
                            </div>
                            <Button variant="primary" size="custom"
                                    onClick={handleCreate}
                                    disabled={isSubmitting || !newCat || !newLimit}
                                    className="w-full py-3 rounded-xl text-[13.5px] font-medium mt-2"
                            >
                                {isSubmitting ? 'Creating…' : 'Create budget'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};