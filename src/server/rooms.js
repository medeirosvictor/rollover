const crypto = require('crypto');
const cors = require('cors');
const express = require('express');
const app = express();
const port = 8000;

app.use(cors());

app.get('/create-room', (req, res) => {
    const RoomCodeResponse = {
        roomCode: 'string',
        createdAt: 'Date',
        lastUsed: 'Date',
        users: 'string'
    }
    RoomCodeResponse.roomCode = generateNewRoomCode();
    RoomCodeResponse.createdAt = new Date();
    RoomCodeResponse.lastUsed = new Date();
    RoomCodeResponse.users = 'string';

    res.send(RoomCodeResponse);
});

function generateNewRoomCode() {
  return crypto.randomBytes(3).toString('hex');
}

app.listen(port, () => console.log(`Listening on port ${port}`));
