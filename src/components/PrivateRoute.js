import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AuthContext } from '../contexts/Auth'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useContext(AuthContext)

  return (
    <Route {...rest} render={props => !!currentUser ?
      <Component  {...props} />:
      <Redirect to='/signin' />}
    />
  )
}

export default PrivateRoute
