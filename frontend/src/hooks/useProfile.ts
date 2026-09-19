// hooks/useProfile.ts
import { useState, useCallback } from 'react';
import { useAxios } from '../axios';
import { useAuth } from './useAuth';
import type { User } from '../types';

interface UpdateProfileResult {
    id: number;
    username: string;
    email: string;
    role: string;
}

export function useProfile() {
    const { api } = useAxios();
    const { user, updateUser } = useAuth();
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const updateProfile = useCallback(async (username: string, email: string) => {
        if (!api) return;
        setIsUpdatingProfile(true);
        try {
            const res: UpdateProfileResult = await api.put('/api/auth/profile', { username, email });
            updateUser({ ...user, username: res.username, email: res.email } as User);
        } finally {
            setIsUpdatingProfile(false);
        }
    }, [api, user, updateUser]);

    const changePassword = useCallback(async (currentPassword: string, newPassword: string, confirmNewPassword: string) => {
        if (!api) return;
        setIsChangingPassword(true);
        try {
            await api.post('/api/auth/change-password', { currentPassword, newPassword, confirmNewPassword });
        } finally {
            setIsChangingPassword(false);
        }
    }, [api]);

    return { updateProfile, changePassword, isUpdatingProfile, isChangingPassword };
}