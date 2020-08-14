import React from 'react'
import { useHistory } from 'react-router-dom'
import { IconButton } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const BackButton = () => {
  const history = useHistory()

  return <IconButton onClick={() => history.goBack()}><ArrowBackIcon /></IconButton>
}

export default BackButton
