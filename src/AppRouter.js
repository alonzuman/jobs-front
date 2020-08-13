import React, { useContext, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// Pages
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

// Components
import PrivateRoute from './components/PrivateRoute';
import CustomAlert from './components/CustomAlert';
import { AuthContext } from './contexts/Auth';
import { Paper } from '@material-ui/core';


const AppRouter = () => {
  const { theme } = useContext(AuthContext)
  const { msg, type, isOn } = alert
  const muiTheme = createMuiTheme(theme);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <Router>
        <CustomAlert />
        <Switch>
          <Paper className='background-paper'>
            <PrivateRoute exact path='/' component={Home} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
          </Paper>
        </Switch>
      </Router>
    </MuiThemeProvider>
  )
}

export default AppRouter
