import { useEffect, useState, type FC, type ReactNode } from 'react';
import type { Message } from '../../shared/types';
import { MessageContext } from './MessageContext';

type MessageMap = { [roomCode: string]: Message[] };

export const MessageProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [messagesByRoom, setMessagesByRoom] = useState<MessageMap>({});

    const addMessage = (msg: Message) => {
        setMessagesByRoom((prev) => {
            const roomMessages = prev[msg.roomCode] || [];
            return {
                ...prev,
                [msg.roomCode]: [...roomMessages, msg],
            };
        });
    };

    const setRoomHistory = (roomCode: string, history: Message[]) => {
        setMessagesByRoom((prev) => ({
            ...prev,
            [roomCode]: history,
        }));
    };

    return (
        <MessageContext.Provider
            value={{ addMessage, setRoomHistory, messagesByRoom }}
        >
            {children}
        </MessageContext.Provider>
    );
};
