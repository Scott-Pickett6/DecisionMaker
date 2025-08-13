import React, { useState } from 'react';
import { Button, Container, FormGroup, TextField, Typography } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { db } from '../firebase/config';
import { collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function JoinRoom() {
    const [name, setName] = useState('');
    const [roomCode, setRoomCode] = useState('');
    const navigate = useNavigate();

    async function handleJoinRoom(event) {
        event.preventDefault();
        
        try{
            const docRef = doc(db, 'rooms', roomCode);
            const roomSnapshot = await getDoc(docRef);

            await updateDoc(docRef, {
                ["users." + name]: {
                    submitted: false,
                    percents: roomSnapshot.data().options.map(() => 0),
                },
            })
            navigate("/virtual-room?roomId=" + roomCode + "&name=" + name);
        }
        catch (error) {
            console.error("Error joining room: ", error);
        }
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
