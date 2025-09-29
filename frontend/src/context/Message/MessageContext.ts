import { createContext } from 'react';
import { type MessageContextType } from '@/shared/types';

export const MessageContext = createContext<MessageContextType | undefined>(
    undefined
);
