import React from 'react';
import './App.css';
import AppRouter from './AppRouter';
import { AuthProvider } from './contexts/Auth';
import { AlertProvider } from './contexts/Alert';
import { JobsProvider } from './contexts/Jobs';
import { UsersProvider } from './contexts/Users';
import { DialoguesProvider } from './contexts/Dialogues';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const App = () => {
  return (
      <AuthProvider>
        <AlertProvider>
          <JobsProvider>
            <UsersProvider>
              <DialoguesProvider>
                <AppRouter />
              </DialoguesProvider>
            </UsersProvider>
          </JobsProvider>
        </AlertProvider>
      </AuthProvider>
  );
}

export default App;
