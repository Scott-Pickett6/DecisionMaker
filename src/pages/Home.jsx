import { Button, Container, Typography } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {

    return (
        <>
            <Header />
            <Container sx={{ textAlign: 'center', marginTop: '10vh', display: 'flex', flexDirection: 'column', gap: '20vh', alignItems: 'center' }}>
                <Button variant="contained" color="primary" href="/create-room">
                    <Typography variant="h3" >
                        Create Room
                    </Typography>
                </Button>
                <Button variant="contained" color="primary" href="/join-room">
                    <Typography variant="h3">
                        Join Room
                    </Typography>
                </Button>
            </Container>
            <Footer />
        </>

    )
}