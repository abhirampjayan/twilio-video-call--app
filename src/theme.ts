import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#55BF3B',
    },
    secondary: { main: '#373b41' },
    error: { main: '#DB503F' },
  },
});
export default theme;
