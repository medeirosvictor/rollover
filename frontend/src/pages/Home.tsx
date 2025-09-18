import React from 'react';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[500px] space-y-4">
            <button
                type="button"
                className="cursor-pointer bg-violet-700 border-3 border-yellow-300 p-2 rounded-md text-white font-bold"
            >
                Enter Room
            </button>
            <input
                type="text"
                placeholder="ROOM CODE"
                className="border-1 p-2 rounded-md text-center"
            />
            <button
                type="button"
                className="cursor-pointer bg-violet-700 border-3 border-yellow-300 p-2 rounded-md text-white font-bold"
            >
                Create Room
            </button>
        </div>
    );
};

export default Home;
