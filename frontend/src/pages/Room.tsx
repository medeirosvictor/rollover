import { useState, type FormEvent } from 'react';
import { useParams } from 'react-router';
import ChatHistory from '../components/ChatHistory';
import { useUserContext } from '../context/User/useUser';
import { useNavigate } from 'react-router';
import { useMessageContext } from '../context/Message/useMessage';
import { sendMessage } from '../api';

function Room() {
    const { roomCode } = useParams<{ roomCode: string }>();
    const [chatInput, setChatInput] = useState<string>('');
    const { addMessage } = useMessageContext();
    const { user } = useUserContext();
    const navigate = useNavigate();

    if (!roomCode || !user) {
        navigate('/');
        return;
    }

    const handleSendMessage = (e: FormEvent) => {
        e.preventDefault();
        if (!chatInput) return;
        sendMessage({
            type: 0,
            body: chatInput,
            clientid: user.clientId ?? 'unknown client',
            roomCode,
            timestamp: Date.now(),
            senderName: user.name ?? 'unknown user',
        });
        setChatInput('');
    };

    return (
        <div>
            <h2 className="text-2xl text-white text-center">
                Welcome to Room {roomCode}
            </h2>
            <ChatHistory roomCode={roomCode ?? ''} />
            <form className="flex space-x-2" onSubmit={handleSendMessage}>
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
                >
                    Send
                </button>
            </form>
        </div>
    );
}

export default Room;
