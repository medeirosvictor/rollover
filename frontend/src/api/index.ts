import {
    getUserFromLocalStorage,
    saveUserToLocalStorage,
} from '../utils/localStorage';
import { type Message, type UnregisteredUser } from '../shared/types';

let socket: WebSocket | null = null;

export function connect(cb: (msg: string) => void, roomCode: string): void {
    socket = new WebSocket(`ws://localhost:8080/room/${roomCode}`);
    console.log('Connecting to WebSocket...');
    socket.onopen = () => {
        console.log('Connected to WebSocket');
        cb('Connected to WebSocket');
    };

    socket.onmessage = (msgEvent) => {
        console.log('Received message: ', msgEvent);
        //parse the msg data as JSON
        const data = JSON.parse(msgEvent.data);

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
        cb(data);
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
        socket.send(JSON.stringify(message));
    }
}
