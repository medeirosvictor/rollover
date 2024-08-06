import { useState } from 'react';
import { Box, Button, Input, Text, VStack } from '@chakra-ui/react';
import './App.css';

function App() {
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
    <Box p={4}>
      <VStack spacing={2}>
        <Box textAlign="center">
          <Button colorScheme="green" onClick={createRoom}>
            Create Room
          </Button>
          {roomCode && <Text mt={2}>Your room code is: {roomCode}</Text>}
        </Box>

        <Box textAlign="center">
          <Input
            type="text"
            placeholder="Enter room code"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            mb={2}
          />
          <Button colorScheme="purple" onClick={joinRoom}>
            Join Room
          </Button>
        </Box>
      </VStack>
    </Box>
  );
}

export default App;