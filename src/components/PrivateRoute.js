import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AuthContext } from '../contexts/Auth'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser, authState} = useContext(AuthContext)

  if (currentUser && authState.isAuth) {
    return <Route {...rest} render={props => <Component {...props} />} />
  } else {
    return <Redirect to='/signin' />
  }
}

export default PrivateRoute
