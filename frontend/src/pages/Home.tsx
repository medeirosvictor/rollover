import { useState } from 'react';
import { sendMessage } from '@/api';
import { generateRoomCode } from '@/utils/generateRoomCode';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Home = () => {
    const [roomNumber, setRoomNumber] = useState<string>('');
    const [roomCode, setRoomCode] = useState<string>('');
    const navigate = useNavigate();

    const handleCreateRoom = () => {
        const newRoomCode = generateRoomCode();
        setRoomNumber(newRoomCode);
        sendMessage(`Room created with code: ${newRoomCode}`);
        axios
            .post('http://localhost:8080/create-room', {
                roomCode: newRoomCode,
            })
            .then((response) => {
                console.log('Room created:', response.data);
                navigate(`/room/${newRoomCode}`);
            })
            .catch((error) => {
                console.error('Error creating room:', error);
            });
    };

    const handleJoinRoom = () => {
        if (!roomCode) {
            console.log('no room code bruh');
            return;
        }

        axios
            .post('http://localhost:8080/room/', { roomCode })
            .then((response) => {
                console.log('Room joined: ', response.data);
                navigate(`/room/${roomCode}`);
            })
            .catch((error) => {
                console.error('Error joining room', error);
            });
    };
    return (
        <div className="flex flex-col items-center justify-center h-[500px] space-y-4">
            <button
                onClick={handleJoinRoom}
                type="button"
                className="cursor-pointer bg-violet-700 border-3 border-yellow-300 p-2 rounded-md text-white font-bold"
            >
                Enter Room
            </button>
            <input
                type="text"
                placeholder="ROOM CODE"
                className="border-1 p-2 rounded-md text-center bg-white "
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
            />
            <button
                type="button"
                className="cursor-pointer bg-violet-700 border-3 border-yellow-300 p-2 rounded-md text-white font-bold"
                onClick={handleCreateRoom}
            >
                Create Room
            </button>
        </div>
    );
};

export default Home;
