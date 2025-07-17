import { Button, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateRoom from './pages/CreateRoom';
import JoinRoom from './pages/JoinRoom';
import VirtualRoom from './pages/VirtualRoom';

const theme = createTheme({
  //teals #004940, #00695c, #33877c
  palette: {
    primary: {
      main: '#004940',
      contrastText: '#d7dadc',
    },
    secondary: {
      main: '#00695c',
      contrastText: '#d7dadc',
    },
    background: {
      default: '#121212',
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: '#d7dadc',
          '::placeholder': {
            color: '#d7dadc',
            opacity: 1,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#d7dadc',
          '&.Mui-focused': {
            color: '#d7dadc',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: '#004940',
          },
          '&:hover fieldset': {
            borderColor: '#004940',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#004940',
          },
        },
      },
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-room" element={<CreateRoom />} />
          <Route path="/join-room" element={<JoinRoom />} />
          <Route path="/virtual-room" element={<VirtualRoom />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;