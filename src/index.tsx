import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#518BF1',
    },
    secondary: {
      main: '#424656',
    },
    text: {
      primary: '#424656',
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
