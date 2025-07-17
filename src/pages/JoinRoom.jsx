import React, { useState } from 'react';
import { Button, Container, FormGroup, TextField, Typography } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function JoinRoom() {
    const [name, setName] = useState('');
    const [roomCode, setRoomCode] = useState('');

    async function handleJoinRoom(event) {
        event.preventDefault();
        console.log('Joining room:', roomCode, 'with name:', name);
        // join room stuff
    }

    return (
        <>
            <Header />
            <Container>
                <FormGroup sx={{ marginTop: 5, gap: 2, width: '75%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <Typography variant="h6" gutterBottom color='primary.contrastText'>
                        Name
                    </Typography>
                    <TextField label="Name" variant="outlined" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} fullWidth/>
                    <Typography variant="h6" gutterBottom color='primary.contrastText'>
                        Room Code
                    </Typography>
                    <TextField label="Room Code" variant="outlined" placeholder="Enter room code" value={roomCode} onChange={(e) => setRoomCode(e.target.value)} fullWidth/>
                    <Button variant="contained" color="primary" onClick={handleJoinRoom}>
                        Join Room
                    </Button>
                </FormGroup>
            </Container>
            <Footer />
        </>
    );
}
