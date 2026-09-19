import { useState, useEffect } from 'react';
import { useAxios } from '../axios';
import type { MonthlyIncomeExpense, CategoryExpense } from '../types';

export function useDashboardData() {
    const { api } = useAxios();
    const [income, setIncome] = useState<MonthlyIncomeExpense[]>([]);
    const [expense, setExpense] = useState<MonthlyIncomeExpense[]>([]);
    const [byCategory, setByCategory] = useState<CategoryExpense[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!api) return;
        setIsLoading(true);
        Promise.all([
            api.get('/api/analytics/income'),
            api.get('/api/analytics/expense'),
            api.get('/api/analytics/category'),
        ])
            .then(([inc, exp, cat]) => {
                setIncome(inc);
                setExpense(exp);
                setByCategory(cat);
            })
            .finally(() => setIsLoading(false));
    }, [api]);

    const monthlyExpenses = expense.map((e) => {
        const inc = income.find((i) => i.year === e.year && i.month === e.month);
        return {
            month: `${e.year}-${String(e.month).padStart(2, '0')}`,
            expenses: e.value,
            income: inc?.value ?? 0,
        };
    });

    return { monthlyExpenses, byCategory, isLoading };
}