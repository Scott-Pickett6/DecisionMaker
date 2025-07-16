import React, { useState } from 'react';
import { Button, Container, FormControl, FormGroup, Input, InputLabel, Typography } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function CreateRoom() {
    const [options, setOptions] = useState(['']);
    const [decisionQuestion, setDecisionQuestion] = useState('');

    function handleOptionChange (index, value) {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    async function handleCreateRoom(event) {
        event.preventDefault();
        console.log("Creating room with question:", decisionQuestion);
        console.log("Options:", options);
        // Handle room creation logic here
    }

    return (
        <>
            <Header />
            <Container>
                <FormGroup>
                    <FormControl>
                        <InputLabel htmlFor="room-name">Decision Question</InputLabel>
                        <Input id="room-name" type="text" placeholder="Enter Decision Question" value={decisionQuestion} onChange={(e) => setDecisionQuestion(e.target.value)}
                        />
                    </FormControl>

                    <FormControl >
                        <Typography variant="h6" gutterBottom>
                            Options
                        </Typography>
                        {options.map((option, index) => (
                            <FormControl key={index} margin="dense">
                                <InputLabel htmlFor={`option-${index}`}>Option {index + 1}</InputLabel>
                                <Input id={`option-${index}`} type="text" placeholder={`Option ${index + 1}`} value={option} onChange={(e) => handleOptionChange(index, e.target.value)}/>
                            </FormControl>
                        ))}
                        <Button variant="outlined" color="primary" onClick={() => setOptions([...options, ''])}>
                            Add Option
                        </Button>
                    </FormControl>
                </FormGroup>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreateRoom}
                >
                    Create Room
                </Button>
            </Container>
            <Footer />
        </>
    );
}
