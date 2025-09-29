import { useEffect, useMemo } from 'react';
import { connect } from '@/api';
import { useUserContext } from '../context/User/useUser';
import { useMessageContext } from '../context/Message/useMessage';
import { useNavigate } from 'react-router';
import type { Message } from '../shared/types';

type Props = {
    roomCode: string;
};

function ChatHistory({ roomCode }: Props) {
    const { user } = useUserContext();
    const navigate = useNavigate();
    const { messagesByRoom, setRoomHistory, addMessage } = useMessageContext();

    if (!roomCode) navigate('/');

    const myClientId = useMemo(() => user?.clientId, [user]);
    const myName = useMemo(() => user?.name, [user]);

    useEffect(() => {
        connect(
            (msg: Message) => addMessage(msg), // onMessage: add new message
            roomCode,
            (history: Message[]) => setRoomHistory(roomCode, history) // onHistory: set history
        );
    }, [roomCode]);

    return (
        <div>
            <div className="border-2 rounded-md w-full flex flex-col bg-white py-2 space-y-2 my-5">
                {messagesByRoom[roomCode]?.map(
                    (msg: Message, index: number) => {
                        const displayName = msg.senderName || msg.clientid;
                        return (
                            <div className="border-b-1 p-1" key={index}>
                                <strong>{displayName}:</strong> {msg.body}
                            </div>
                        );
                    }
                )}
            </div>
        </div>
    );
}

export default ChatHistory;
