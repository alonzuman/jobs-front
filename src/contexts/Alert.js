import React, { useState } from 'react'

export const AlertContext = React.createContext()

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    isOn: false,
    msg: '',
    type: ''
  })

  const setAlertFunction = ({ isOn, type, msg }) => {
    setAlert({
      isOn,
      type,
      msg
    })
    setTimeout(() => {
      setAlert({
        isOn: false,
        msg: '',
        type: ''
      })
    }, 3000);
  }

  const invalidInputAlert = (field) => {
    setAlertFunction({ isOn: true, msg: `Please fill ${field} field properly`, type: 'error' })
  }

  return (
    <AlertContext.Provider value={{ alert, setAlertFunction, invalidInputAlert }}>
      {children}
    </AlertContext.Provider>
  )
}
