import { useContext } from 'react';
import { MessageContext } from './MessageContext';
import { type MessageContextType } from '@/shared/types';

export function useMessageContext(): MessageContextType {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error(
            'useMessageContext must be used within a MessageProvider'
        );
    }
    return context;
}
