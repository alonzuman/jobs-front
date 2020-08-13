import React from 'react';
import './App.css';
import { AuthProvider } from './contexts/Auth';
import { AlertProvider } from './contexts/Alert';

// Mui
import theme from './theme';
import { Paper, Container, ThemeProvider } from '@material-ui/core'
import AppRouter from './AppRouter';



const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AlertProvider>
          <AppRouter />
        </AlertProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
