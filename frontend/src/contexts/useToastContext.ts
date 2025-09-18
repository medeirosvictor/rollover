import { useContext } from 'react';
import { ToastContext } from '@/context/ToastContextObject';
import type { ToastContextType } from '@/context/ToastTypes';

export function useToastContext(): ToastContextType {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast must be used within ToastProvider');
    return ctx;
}
