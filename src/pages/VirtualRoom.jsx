import Header from '../components/Header';
import Footer from '../components/Footer';
import { useParams } from "react-router-dom";
import { db } from '../firebase/config';
import { collection, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Button, Container, FormGroup, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function VirtualRoom() {
    const [options, setOptions] = useState([]);
    const [decisionQuestion, setDecisionQuestion] = useState('');
    const [users, setUsers] = useState({});
    const [percents, setPercents] = useState([]);
    const [error, setError] = useState("");
    const [choiceResults, setChoiceResults] = useState([]);
    const [allSubmittedState, setAllSubmittedState] = useState(false);
    const [winner, setWinner] = useState("");
    const navigate = useNavigate();
    const [waiting, setWaiting] = useState(false);

    const [searchParams] = useSearchParams();
    const roomId = searchParams.get('roomId');
    const name = searchParams.get('name');

    useEffect(() => {
        fetchRoomData(roomId);
    }, []);



    async function fetchRoomData(roomId) {
        try {
            const docRef = doc(db, 'rooms', roomId);
            const roomSnapshot = await getDoc(docRef);
            if (roomSnapshot.exists()) {
                const roomData = roomSnapshot.data();
                setDecisionQuestion(roomData.question);
                setOptions(roomData.options);
                setUsers(roomData.users);
            }

            else {
                console.error("No such document!");
                navigate("/");
            }
        }
        catch (error) {
            console.error("Error fetching room data: ", error);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const docRef = doc(db, "rooms", roomId);

            if (percents.length !== options.length) {
                setError("Please enter a percent for each option.");
                return;
            }

            let sum = 0;
            for (let i = 0; i < options.length; i++) {
                sum += parseInt(percents[i]);
            }
            if (sum !== 100) {
                setError("Total percent must equal 100.");
                return;
            }

            await updateDoc(docRef, {
                ["users." + name + ".percents"]: percents,
                ["users." + name + ".submitted"]: true,
            });
            setWaiting(true);
            allSubmitted();
            setError("");
        }
        catch (error) {
            console.error("Error submitting percents: ", error);
        }
    }

    async function allSubmitted() {
        const docRef = await doc(db, "rooms", roomId);
        const unsubscribe = await onSnapshot(docRef, async (doc) => {
            const roomSnapshot = await getDoc(docRef);
            const data = roomSnapshot.data();
            console.log("Current data: ", data);
            const allSubmitted = Object.values(data.users).every((user) => user.submitted === true);
            if (allSubmitted) {
                const results = options.map((option, i) => {
                    let result = 0;
                    for (let user in data.users) {
                        result += Number(data.users[user].percents[i]) / Object.keys(data.users).length;
                    }
                    return { option, percent: result };
                });

                setChoiceResults(results);

                const maxResult = Math.max(...results.map(r => r.percent));
                const winners = results.filter(r => r.percent === maxResult);

                if (winners.length > 1) {
                    setWinner("It's a tie!");
                } else {
                    setWinner(winners[0].option + " is the winner!");
                }

                setAllSubmittedState(true);
                setWaiting(false);
                await deleteDoc(docRef);
                unsubscribe();
            }
        })
    }


    return (
        <>
            <Header />
            <Container>
                <Typography variant="h4" gutterBottom color='primary.contrastText' sx={{ marginTop: 5, textAlign: 'center' }}>
                    Join Code: {roomId}
                </Typography>

                <FormGroup sx={{ marginTop: 5, gap: 2, width: '75%', marginLeft: 'auto', marginRight: 'auto' }}>
                    {options.map((option, index) => (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 1 }} key={index}>
                            <Typography key={"option" + index} variant="h7" gutterBottom color='primary.contrastText'>
                                {option}:
                            </Typography>
                            <TextField
                                key={"percent" + index}
                                variant="outlined"
                                placeholder={`Enter Percent`}
                                type='number'
                                value={percents[index] || ''}
                                onChange={(e) => {
                                    const newPercents = [...percents];
                                    newPercents[index] = e.target.value;
                                    setPercents(newPercents);
                                }}
                                fullWidth
                                disabled={allSubmittedState}
                            />
                        </Box>
                    ))}
                    <Button variant="contained" color="primary" onClick={handleSubmit} disabled={allSubmittedState}>
                        Submit
                    </Button>
                    {error && <Typography variant="body1" color="error">{error}</Typography>}
                    {allSubmittedState && (
                        <Box sx={{ marginTop: 4 }}>
                            <Typography variant="h5" gutterBottom color='primary.contrastText'>
                                Results:
                            </Typography>
                            {choiceResults.map((result, index) => (
                                <Typography key={index} variant="h6" gutterBottom color='primary.contrastText'>
                                    {result.option}: {result.percent}%
                                </Typography>
                            ))}
                            <Typography variant="h4" gutterBottom color='secondary.contrastText' sx={{ marginTop: 2 }}>
                                {winner}
                            </Typography>
                            <Button variant='contained' color='primary' onClick={() => {
                                navigate("/");
                            }}>
                                Back to Home
                            </Button>
                        </Box>
                    )}
                    {waiting && (
                        <Typography variant="h6" gutterBottom color='primary.contrastText'>
                            Waiting for all users to submit...
                        </Typography>
                    )}
                </FormGroup>
            </Container>
            <Footer />
        </>
    )
}