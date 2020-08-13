import React, { useContext } from 'react'
import { Dialog, DialogTitle, IconButton, DialogContent, Switch, FormControlLabel, Button } from '@material-ui/core'
import { AuthContext } from '../contexts/Auth'
import CloseIcon from '@material-ui/icons/Close'
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { signOut } from '../controllers/users'

const Settings = () => {
  const { theme, toggleTheme, openSettings, setOpenSettings } = useContext(AuthContext)
  const handleSignOut = () => {
    signOut()
    setOpenSettings(false)
  }

  return (
    <Dialog open={openSettings} onClose={() => setOpenSettings(false)}>
      <div className='header-style'>
        <DialogTitle className='title-style'>
          Settings
        </DialogTitle>
        <IconButton onClick={() => setOpenSettings(false)}>
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
