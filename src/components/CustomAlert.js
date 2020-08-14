import React, { useContext } from 'react'
import { AlertContext } from '../contexts/Alert';
import { Alert } from '@material-ui/lab'

const CustomAlert = () => {
  const { alert, clearAlert } = useContext(AlertContext)
  const { msg, isOn, type } = alert

  const alertContainerStyle = {
    width: '100%',
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    zIndex: 9999999,
    bottom: '2rem',
    minWidth: 180,
    cursor: 'pointer'
  }

  return (
    <div onClick={clearAlert} style={alertContainerStyle}>
      {isOn === true && <Alert severity={type}>{msg}</Alert>}
    </div>
  )
}

export default CustomAlert
