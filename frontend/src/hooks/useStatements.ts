import { useState, useCallback } from 'react';
import { useAxios } from '../axios';
import type { ParsedTransaction, Statement } from '../types';

export function useStatements() {
    const { api } = useAxios();
    const [isUploading, setIsUploading] = useState(false);

    const uploadText = useCallback(async (statementText: string): Promise<ParsedTransaction[]> => {
        if (!api) return [];
        setIsUploading(true);
        try {
            const res = await api.post('/api/statements/upload/text', { statementText });
            return res;
        } finally {
            setIsUploading(false);
        }
    }, [api]);

    const uploadPdf = useCallback(async (file: File): Promise<ParsedTransaction[]> => {
        if (!api) return [];
        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            const res = await api.post('/api/statements/upload/pdf', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return res;
        } finally {
            setIsUploading(false);
        }
    }, [api]);

    const accept = useCallback(async (transactions: ParsedTransaction[]) => {
        if (!api) return;
        await api.post('/api/statements/accept', { transactions });
    }, [api]);

    const [statements, setStatements] = useState<Statement[]>([]);
    const [isLoadingStatements, setIsLoadingStatements] = useState(true);

    const refreshStatements = useCallback(async () => {
        if (!api) return;
        setIsLoadingStatements(true);
        try {
            setStatements(await api.get('/api/statements'));
        } finally {
            setIsLoadingStatements(false);
        }
    }, [api]);

    return { uploadText, uploadPdf, accept, isUploading, statements, isLoadingStatements, refreshStatements };
}