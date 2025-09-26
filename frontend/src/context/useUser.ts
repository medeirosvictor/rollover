import { useContext } from 'react';
import { UserContext } from './UserContext';
import { type UserContextType } from '@/shared/types';

export function useUserContext(): UserContextType {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
}
