import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { IconButton } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { AuthContext } from '../contexts/Auth';

const BackButton = () => {
  const { theme } = useContext(AuthContext)
  const history = useHistory()
  const backButtonStyle = {
    margin: '1rem',
    position: 'fixed',
    zIndex: 9999,
    backgroundColor: theme.palette.type === 'dark' ? '#333333' : 'white',
    boxShadow: '0 0 10px #00000015'
  }

  return <IconButton style={backButtonStyle} onClick={() => history.goBack()}><ArrowBackIcon /></IconButton>
}

export default BackButton
