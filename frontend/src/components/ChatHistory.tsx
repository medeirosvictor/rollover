import { useEffect, useState } from 'react';
import { connect } from '@/api';
import { Message } from '@/shared/types';

type Props = {
    roomCode: string;
};

function ChatHistory({ roomCode }: Props) {
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const handleMessage = (msg: string) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        };

        connect(handleMessage, roomCode);
    }, []);

    return (
        <div>
            <div className="border-2 rounded-md w-full flex flex-col bg-white py-2 space-y-2 my-5">
                {messages.map((msg, index) => (
                    <div className="border-b-1 p-1" key={index}>
                        <strong>{msg.clientid}:</strong> {msg.body}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChatHistory;
