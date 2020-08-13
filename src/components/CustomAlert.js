import React from 'react'
import { Alert } from '@material-ui/lab'

const CustomAlert = ({ isOn, type, msg }) => {
  const alertContainerStyle = {
    width: '100%',
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    zIndex: 999,
    bottom: '1rem'
  }

  return (
    <div style={alertContainerStyle}>
      {isOn === true && <Alert severity={type}>{msg}</Alert>}
    </div>
  )
}

export default CustomAlert
