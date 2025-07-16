import { AppBar, Toolbar, Typography, Button } from "@mui/material";

export default function Header(){

    return(
        <header>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Decision Maker
                    </Typography>
                </Toolbar>
            </AppBar>
        </header>
    )
}