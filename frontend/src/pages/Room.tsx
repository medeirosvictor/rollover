import React from 'react';
import { useParams } from 'react-router';
import { sendMessage } from '@/api';
import ChatHistory from '../components/ChatHistory';

function Room() {
    const { roomCode } = useParams<{ roomCode: string }>();
    const [chatInput, setChatInput] = React.useState<string>('');
    return (
        <div>
            <h2 className="text-2xl text-white text-center">
                Welcome to Room {roomCode}
            </h2>
            <ChatHistory roomCode={roomCode ?? ''} />
            <form
                className="flex space-x-2"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    className="border-1 p-2 rounded-md w-full border-gray-700 bg-white"
                    type="text"
                    id="chatinput"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                />
                <button
                    className="bg-violet-700 border-3 border-yellow-300 p-2 rounded-md text-white font-bold"
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
