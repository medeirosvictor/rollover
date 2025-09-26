import { useState, useEffect, type FC, type ReactNode } from 'react';
import { type UnregisteredUser } from '@/shared/types';
import {
    getUserFromLocalStorage,
    saveUserToLocalStorage,
} from '../utils/localStorage';
import { UserContext } from './userContext';

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUserState] = useState<UnregisteredUser | null>(null);

    useEffect(() => {
        const storedUser = getUserFromLocalStorage();
        if (storedUser) {
            setUserState(storedUser);
        }
    }, []);

    const setUser = (user: UnregisteredUser) => {
        setUserState(user);
        saveUserToLocalStorage(user);
    };

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
