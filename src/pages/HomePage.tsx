import React from 'react';

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Home Page</h1>
            <button className="bg-blue-500 text-white py-2 px-4 rounded mb-2">Join Room</button>
            <button className="bg-green-500 text-white py-2 px-4 rounded">Create Room</button>
        </div>
    )
}

export default HomePage;