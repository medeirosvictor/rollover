import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [joinCode, setJoinCode] = useState<string>('');

  const createRoom = async () => {
    const response = await fetch('http://localhost:3001/api/create-room', {
      method: 'POST',
    });
    const data = await response.json();
    setRoomCode(data.roomCode);
  };

  const joinRoom = () => {
    alert(`Joining room with code: ${joinCode}`);
  };

  return (
    <div className="p-4">
      <div className="create-room mt-4 text-center">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          onClick={createRoom}
        >
          Create Room
        </button>
        {roomCode && <p className="mt-2">Your room code is: {roomCode}</p>}
      </div>

      <div className="join-room mt-4 text-center">
        <input
          type="text"
          placeholder="Enter room code"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
          className="border px-4 py-2 rounded-md"
        />
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded-md ml-2"
          onClick={joinRoom}
        >
          Join Room
        </button>
      </div>
    </div>
  );
}

export default App;