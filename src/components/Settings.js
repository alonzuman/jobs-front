import React, { useContext } from 'react'
import { Dialog, DialogTitle, IconButton, DialogContent, Switch, FormControlLabel, Button } from '@material-ui/core'
import { AuthContext } from '../contexts/Auth'
import CloseIcon from '@material-ui/icons/Close'
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { Redirect } from 'react-router-dom';
import { DialoguesContext } from '../contexts/Dialogues';

const Settings = () => {
  const { openSettings, setOpenSettingsDialog } = useContext(DialoguesContext)
  const { logOut, theme, toggleTheme } = useContext(AuthContext)

  const handleSignOut = () => {
    logOut()
    setOpenSettingsDialog(false)
    return <Redirect to='/signin' />
  }

  return (
    <Dialog open={openSettings} onClose={() => setOpenSettingsDialog(false)}>
      <div className='header-style'>
        <DialogTitle className='title-style'>
          Settings
        </DialogTitle>
        <IconButton onClick={() => setOpenSettingsDialog(false)}>
          <CloseIcon />
        </IconButton>
      </div>
      <DialogContent>
        <FormControlLabel
          control={<Switch color='primary'checked={theme.palette.dark} onChange={toggleTheme} name='theme' />}
          label={<Brightness4Icon />}
        />
        <br />
        <br />
        <Button className='button' variant='outlined' onClick={handleSignOut}>Sign Out</Button>
      </DialogContent>
    </Dialog>
  )
}

export default Settings
