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
        cb(data);
    };

    socket.onclose = (e) => {
        console.log('Socket is closed');
    };

    socket.onerror = (err) => {
        console.error(
            'Socket encountered error: ',
            err.message,
            'Closing socket'
        );
    };
}

export function sendMessage(msg: string): void {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ body: msg }));
    }
}
