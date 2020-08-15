import React, { useContext, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// Pages
import Results from './pages/Results'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home';

// Components
import PrivateRoute from './components/PrivateRoute';
import CustomAlert from './components/CustomAlert';
import { AuthContext } from './contexts/Auth';
import { Paper } from '@material-ui/core';
import MenuDialogues from './components/MenuDialogues';
import AuthDialogues from './components/AuthDialogues';
import JobsList from './components/JobsList';
import UsersList from './components/UsersList';
import SkillsPicker from './pages/ProfileFields/SkillsPicker';


const AppRouter = () => {
  const { theme, authState } = useContext(AuthContext)
  const muiTheme = createMuiTheme(theme);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <Router>
        <CustomAlert />
        <AuthDialogues />
        { authState.isAuth && <MenuDialogues /> }
        <Switch>
          <Paper className='background-paper'>
            <Route exact path ='/skills-picker' component={SkillsPicker} />
            <Route exact path ='/' component={Home} />
            <Route exact path='/results/employees' component={UsersList} />
            <Route exact path='/results/jobs' component={JobsList} />
          </Paper>
        </Switch>
      </Router>
    </MuiThemeProvider>
  )
}

export default AppRouter
