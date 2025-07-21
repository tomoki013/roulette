'use client';

import { useContext } from 'react';
import { AuthContext } from '@/store/AuthContext';

// AuthContextを使いやすくするためのカスタムフック
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
