import { useState, useEffect, useCallback } from 'react';
import { useAxios } from '../axios';
import type { Transaction } from '../types';

export function useTransactions() {
    const { api } = useAxios();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const refresh = useCallback(async () => {
        if (!api) return;
        setIsLoading(true);
        try {
            setTransactions(await api.get('/api/transactions'));
        } finally {
            setIsLoading(false);
        }
    }, [api]);

    useEffect(() => { refresh(); }, [refresh]);

    return { transactions, isLoading, refresh };
}