import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { IconButton, Paper } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { AuthContext } from '../contexts/Auth';

const BackButton = () => {
  const { theme } = useContext(AuthContext)
  const history = useHistory()
  const paperStyle = {
    margin: '1rem',
    position: 'fixed',
    zIndex: 9999,
    backgroundColor: theme.palette.type === 'dark' ? '#333333' : 'white',
    boxShadow: '0 0 10px #00000015',
    borderRadius: '50%'
  }

  return <Paper style={paperStyle}><IconButton onClick={() => history.goBack()}><ArrowBackIcon /></IconButton></Paper>
}

export default BackButton
