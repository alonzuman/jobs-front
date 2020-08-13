import React, { useState } from 'react';
import './App.css';
import { AuthProvider } from './contexts/Auth';
import { AlertProvider } from './contexts/Alert';
import AppRouter from './AppRouter';
import { JobsProvider } from './contexts/Jobs';
import { UsersProvider } from './contexts/Users';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const App = () => {
  return (
      <AuthProvider>
        <AlertProvider>
          <JobsProvider>
            <UsersProvider>
              <AppRouter />
            </UsersProvider>
          </JobsProvider>
        </AlertProvider>
      </AuthProvider>
  );
}

export default App;
