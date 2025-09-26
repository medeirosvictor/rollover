import { useEffect, useState, useMemo } from 'react';
import { connect } from '@/api';
import { Message } from '@/shared/types';
import { useUserContext } from '../context/useUser';

type Props = {
    roomCode: string;
};

function ChatHistory({ roomCode }: Props) {
    const [messages, setMessages] = useState<string[]>([]);
    const { user } = useUserContext();

    const myClientId = useMemo(() => user?.clientId, [user]);
    const myName = useMemo(() => user?.name, [user]);

    useEffect(() => {
        const handleMessage = (msg: string) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        };

        connect(handleMessage, roomCode);
    }, [roomCode]);

    return (
        <div>
            <div className="border-2 rounded-md w-full flex flex-col bg-white py-2 space-y-2 my-5">
                {messages.map((msg, index) => {
                    const displayName =
                        msg.clientid === myClientId && myName
                            ? myName
                            : msg.clientid;
                    return (
                        <div className="border-b-1 p-1" key={index}>
                            <strong>{displayName}:</strong> {msg.body}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ChatHistory;
