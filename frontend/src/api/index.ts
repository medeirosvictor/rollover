import {
    getUserFromLocalStorage,
    saveUserToLocalStorage,
} from '../utils/localStorage';
import { type Message, type UnregisteredUser } from '../shared/types';

let socket: WebSocket | null = null;

export function connect(
    onMessage: (msg: Message) => void,
    roomCode: string,
    onHistory?: (history: Message[]) => void
): void {
    socket = new WebSocket(`ws://localhost:8080/room/${roomCode}`);
    console.log('Connecting to WebSocket...');

    socket.onopen = () => {
        console.log('Connected to WebSocket');
        const user = getUserFromLocalStorage();
        onMessage({
            type: -1,
            body: 'Connected to WebSocket',
            clientid: user?.clientId ?? '',
            roomCode,
            timestamp: Date.now(),
            senderName: user?.name ?? '',
        });
    };

    socket.onmessage = (msgEvent) => {
        console.log('Received message FROM OUTSIDE?: ', msgEvent);
        const data = JSON.parse(msgEvent.data);

        switch (data.type) {
            case 69:
                if (Array.isArray(data.history)) {
                    if (onHistory) {
                        onHistory(data.history);
                    }
                    return;
                }
                break;
            // Message coming from someone else
            case 1:
                onMessage(data);
                break;
            default: {
                const user = getUserFromLocalStorage();
                if (!user && data.clientid) {
                    // Prepopulate localStorage with clientId from backend
                    const newUser: UnregisteredUser = {
                        clientId: data.clientid,
                        name: '', // or data.name if available
                        colorTheme: '', // or data.colorTheme if available
                        avatarUrl: '', // or data.avatarUrl if available
                    };
                    saveUserToLocalStorage(newUser);
                }
                onMessage(data);
                break;
            }
        }
    };

    socket.onclose = (e) => {
        console.log('Socket is closed');
    };

    socket.onerror = (err) => {
        console.error('Socket encountered error: ', err, 'Closing socket');
    };
}

export function sendMessage(message: Message): void {
    if (socket && socket.readyState === WebSocket.OPEN) {
        console.log('sending message: ', message);
        socket.send(JSON.stringify(message));
    }
}
