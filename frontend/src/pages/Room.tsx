import React from 'react';
import { useParams } from 'react-router';
import { sendMessage } from '@/api';
import ChatHistory from '../components/ChatHistory';

function Room() {
    const { roomCode } = useParams<{ roomCode: string }>();
    const [chatInput, setChatInput] = React.useState<string>('');
    return (
        <div>
            <h2>Welcome to Room {roomCode}</h2>
            <ChatHistory roomCode={roomCode ?? ''} />
            <form
                className="flex space-x-2"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    className="border-1 p-2 rounded-md text-center"
                    type="text"
                    id="chatinput"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                />
                <button
                    type="submit"
                    onClick={() => {
                        sendMessage(chatInput);
                        setChatInput('');
                    }}
                >
                    Send
                </button>
            </form>
        </div>
    );
}

export default Room;
