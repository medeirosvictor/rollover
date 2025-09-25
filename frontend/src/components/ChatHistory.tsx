import { useEffect, useState } from 'react';
import { connect } from '@/api';

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
            Chat Room: {roomCode}
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
        </div>
    );
}

export default ChatHistory;
