import React, { useState } from 'react'

export const AlertContext = React.createContext()

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    isOn: false,
    msg: '',
    type: ''
  })

  const clearAlert = () => {
    setAlert({
      isOn: false,
      msg: '',
      type: ''
    })
  }

  const setAlertFunction = ({ isOn, type, msg }) => {
    setAlert({
      isOn,
      type,
      msg
    })
    setTimeout(() => clearAlert(), 3000);
  }

  const invalidInputAlert = (field) => {
    setAlertFunction({ isOn: true, msg: `Please fill ${field} field properly`, type: 'error' })
  }

  const value = {
    alert,
    setAlertFunction,
    invalidInputAlert,
    clearAlert
  }

  return (
    <AlertContext.Provider value={value}>
      {children}
    </AlertContext.Provider>
  )
}
