import React, { useState } from 'react';
import {
    Button,
    Container,
    FormControl,
    FormGroup,
    TextField,
    Typography,
} from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function CreateRoom() {
    const [options, setOptions] = useState(['']);
    const [decisionQuestion, setDecisionQuestion] = useState('');
    const [name, setName] = useState("");
    const navigate = useNavigate();

    function handleOptionChange(index, value) {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    }

    async function handleCreateRoom(event) {
        event.preventDefault();
        console.log('Creating room with question:', decisionQuestion);
        console.log('Options:', options);

        try {
            const roomData = {
                question: decisionQuestion,
                options: options.filter(option => option.trim() !== ''),
                users: {
                    [name]: {
                        submitted: false,
                        percents: options.map(() => 0),
                    },
                },
            };
            const docRef = await addDoc(collection(db, 'rooms'), roomData);
            navigate("/virtual-room?roomId=" + docRef.id + "&name=" + name);
        }
        catch (error) {
            console.error("Error creating room: ", error);
        }
    }

    return (
        <>
            <Header />
            <Container>
                <FormGroup sx={{ marginTop: 5, gap: 2, width: '75%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <Typography variant="h6" gutterBottom color='primary.contrastText'>
                        Decision Question
                    </Typography>
                    <TextField label="Decision Question" variant="outlined" placeholder="Enter Decision Question" value={decisionQuestion} onChange={(e) => setDecisionQuestion(e.target.value)} fullWidth />
                    <FormControl>
                        <Typography variant="h6" gutterBottom color='primary.contrastText'>
                            Options
                        </Typography>

                        {options.map((option, index) => (
                            <TextField key={index} label={`Option ${index + 1}`} variant="outlined" placeholder={`Enter Option ${index + 1}`} value={option} onChange={(e) => handleOptionChange(index, e.target.value)} fullWidth margin="dense" />
                        ))}
                        <Button variant="contained" color="primary" onClick={() => setOptions([...options, ''])} sx={{ mt: 1 }}>Add Option</Button>
                    </FormControl>
                    <Typography variant="h6" gutterBottom color='primary.contrastText'>
                        Name
                    </Typography>
                    <TextField label="Name" variant="outlined" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                    <Button variant="contained" color="primary" onClick={handleCreateRoom}>Create Room</Button>
                </FormGroup>
            </Container>
            <Footer />
        </>
    );
}
