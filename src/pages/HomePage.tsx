import React from 'react';

interface RoomCodeResponse {
    roomCode: string;
    createdAt: Date;
    lastUsed: Date;
    users: string[]; 
}

const HomePage = () => {

    const handleCreateRoom = async () => {
        // open websocket connection with generated room code and redirect to room page
        // write an ajax function to my backend server that will generate a room code and return it
        // window.location.href = `/room/${roomCode}`;
        console.log("Creating Room");
        try {
            const res = await fetch('http://localhost:8000/create-room', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
        
            if (!res.ok) {
                throw new Error('HTTP Error! status: ' + res.status);
            }
            const data: RoomCodeResponse = await res.json();
            console.log(data);
            // window.location.href = `/room/${data.roomCode}`;
        } catch (error) {
            console.log(error);
        }


    }


    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-4">Home Page</h1>
            <button className="bg-blue-500 text-white py-2 px-4 rounded mb-2">Join Room</button>
            <button onClick={handleCreateRoom} className="bg-green-500 text-white py-2 px-4 rounded">Create Room</button>
        </div>
    )
}

export default HomePage;