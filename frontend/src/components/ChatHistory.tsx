import { useEffect, useState } from 'react';
import { connect } from '@/api';

type Props = {};

function ChatHistory({}: Props) {
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const handleMessage = (msg: string) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        };

        connect(handleMessage);
    }, []);

    return (
        <div>
            Chat History Component
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
        </div>
    );
}

export default ChatHistory;
