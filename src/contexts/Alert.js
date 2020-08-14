import React, { useReducer } from 'react'
import { alertReducer, initialState } from '../reducers/alert'

export const AlertContext = React.createContext()

export const AlertProvider = ({ children }) => {
  const [state, dispatch] = useReducer(alertReducer, initialState)

  const clearAlert = () => dispatch({ type: 'CLEAR_ALERT' })
  const setAlert = ({msg, type}) => {
    dispatch({
      type: 'SET_ALERT',
      payload: {
        msg, type
      }
    })
    setTimeout(() => clearAlert(), 3000)
  }

  const value = {
    alert: state,
    setAlert,
    clearAlert
  }

  return (
    <AlertContext.Provider value={value}>
      {children}
    </AlertContext.Provider>
  )
}
