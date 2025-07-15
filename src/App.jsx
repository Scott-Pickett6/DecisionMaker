import { Button, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
    }
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Button variant="contained" color="primary">
        Primary Button
      </Button>
      <Button variant="contained" color="secondary">
        Secondary Button
      </Button>
    </ThemeProvider>
  );
}
export default App;