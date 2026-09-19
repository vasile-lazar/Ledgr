import type { TransactionCategory } from '../types';

export const CATEGORY_STYLE: Record<TransactionCategory, { color: string }> = {
    Groceries: { color: '#10b981' },
    Transport: { color: '#6366f1' },
    Salary: { color: '#22c55e' },
    Entertainment: { color: '#a855f7' },
    Dining: { color: '#f97316' },
    Shopping: { color: '#ec4899' },
    Utilities: { color: '#ef4444' },
    Other: { color: '#6b7280' },
};