import React, { useState } from 'react';
import './App.css';
import { AuthProvider } from './contexts/Auth';
import { AlertProvider } from './contexts/Alert';
import AppRouter from './AppRouter';
import { JobsProvider } from './contexts/Jobs';
import { UsersProvider } from './contexts/Users';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { DialoguesProvider } from './contexts/Dialogues';

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
