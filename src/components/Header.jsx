import { AppBar, Toolbar, Typography, Button, Link } from "@mui/material";

export default function Header() {

    return (
        <header>
            <AppBar position="static">
                <Toolbar>
                        <Link href="/" color="primary.contrastText" underline="none">
                            <Typography variant="h6">
                                Decision Maker
                            </Typography>
                        </Link>
                </Toolbar>
            </AppBar>
        </header>
    )
}