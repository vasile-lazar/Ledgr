import { useState, useEffect, useCallback } from 'react';
import { useAxios } from '../axios';
import type { Budget, TransactionCategory } from '../types';

export function useBudgets() {
    const { api } = useAxios();
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const refresh = useCallback(async () => {
        if (!api) return;
        setIsLoading(true);
        try {
            setBudgets(await api.get('/api/budget'));
        } finally {
            setIsLoading(false);
        }
    }, [api]);

    useEffect(() => { refresh(); }, [refresh]);

    const create = useCallback(async (category: TransactionCategory, amount: number) => {
        if (!api) return;
        await api.post('/api/budget/create', { category, amount });
        await refresh();
    }, [api, refresh]);

    const update = useCallback(async (id: number, amount: number) => {
        if (!api) return;
        await api.patch(`/api/budget/update/${id}`, { amount });
        await refresh();
    }, [api, refresh]);

    const remove = useCallback(async (id: number) => {
        if (!api) return;
        await api.delete(`/api/budget/delete/${id}`);
        await refresh();
    }, [api, refresh]);

    return { budgets, isLoading, refresh, create, update, remove };
}