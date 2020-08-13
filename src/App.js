import React from 'react';
import './App.css';
import { AuthProvider } from './contexts/Auth';
import { AlertProvider } from './contexts/Alert';

// Mui
import theme from './theme';
import { ThemeProvider } from '@material-ui/core'
import AppRouter from './AppRouter';
import { JobsProvider } from './contexts/Jobs';
import { UsersProvider } from './contexts/Users';



const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AlertProvider>
          <JobsProvider>
            <UsersProvider>
              <AppRouter />
            </UsersProvider>
          </JobsProvider>
        </AlertProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
