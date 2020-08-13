import React, { useContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AlertProvider, AlertContext } from './contexts/Alert';

// Pages
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

// Components
import PrivateRoute from './components/PrivateRoute';
import CustomAlert from './components/CustomAlert';


const AppRouter = () => {
  const { alert } = useContext(AlertContext)
  const { msg, type, isOn } = alert

  return (
    <Router>
      {isOn && <CustomAlert isOn={true} msg={msg} type={type} />}
      <Switch>
        <PrivateRoute exact path='/' component={Home} />
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
      </Switch>
    </Router>
  )
}

export default AppRouter
