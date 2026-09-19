import { useMemo } from 'react';

interface MonthlySpendingPoint {
    month: string;
    expenses: number;
    income: number;
}

export function useOverviewStats(monthlyExpenses: MonthlySpendingPoint[]) {
    return useMemo(() => {
        const current = monthlyExpenses[monthlyExpenses.length - 1];
        const previous = monthlyExpenses[monthlyExpenses.length - 2];

        const income = current?.income ?? 0;
        const expenses = current?.expenses ?? 0;
        const savings = income - expenses;
        const savingsRate = income > 0 ? Math.round((savings / income) * 100) : 0;

        const pctChange = (curr: number, prev: number | undefined) => {
            if (!prev) return null;
            return ((curr - prev) / prev) * 100;
        };

        const incomeDelta = pctChange(income, previous?.income);
        const expensesDelta = pctChange(expenses, previous?.expenses);
        const savingsDelta = pctChange(savings, previous ? previous.income - previous.expenses : undefined);

        return [
            {
                label: 'Total Income', value: income.toLocaleString('ro'), unit: 'MDL',
                delta: incomeDelta !== null ? `${incomeDelta >= 0 ? '+' : ''}${incomeDelta.toFixed(1)}%` : '—',
                up: incomeDelta !== null ? incomeDelta >= 0 : true, color: '#10b981',
            },
            {
                label: 'Total Expenses', value: expenses.toLocaleString('ro'), unit: 'MDL',
                delta: expensesDelta !== null ? `${expensesDelta >= 0 ? '+' : ''}${expensesDelta.toFixed(1)}%` : '—',
                up: expensesDelta !== null ? expensesDelta < 0 : true, color: '#ef4444',
            },
            {
                label: 'Savings', value: savings.toLocaleString('ro'), unit: 'MDL',
                delta: savingsDelta !== null ? `${savingsDelta >= 0 ? '+' : ''}${savingsDelta.toFixed(1)}%` : '—',
                up: savingsDelta !== null ? savingsDelta >= 0 : true, color: '#6366f1',
            },
            {
                label: 'Savings Rate', value: String(savingsRate), unit: '%',
                delta: '—', up: savingsRate >= 0, color: '#f59e0b',
            },
        ];
    }, [monthlyExpenses]);
}