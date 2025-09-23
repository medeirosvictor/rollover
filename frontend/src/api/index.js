var socket = new WebSocket('ws://localhost:8080/ws');

let connect = (cb) => {
    console.log('Connecting to WebSocket...');
    socket.onopen = () => {
        console.log('Connected to WebSocket');
        cb('Connected to WebSocket');
    };

    socket.onmessage = (msg) => {
        console.log('Received message: ', msg);
        cb(msg.data);
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
};

let sendMessage = (msg) => {
    console.log('Sending message: ', msg);
    socket.send(msg);
};

export { connect, sendMessage };
