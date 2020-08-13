import React, { useContext } from 'react'
import { Avatar, MenuItem, Menu, Switch, IconButton, Dialog, DialogTitle } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import { Skeleton } from '@material-ui/lab'
import { useState } from 'react';
import { signOut } from '../firebase';
import { AuthContext } from '../contexts/Auth';
import EditProfile from '../pages/EditProfile';

const TopMenu = () => {
  const { userProfile } = useContext(AuthContext)
  const [editingProfile, setEditingProfile] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleClick = e => {
    setMenuOpen(true)
    setAnchorEl(e.currentTarget)
  }

  const handleClose = e => {
    setMenuOpen(false)
    setAnchorEl(null)
  }

  const handleEditClick = e => {
    setEditingProfile(true)
    setMenuOpen(false)
  }

  return (
    <>
    <IconButton onClick={handleClick}>
      {userProfile && <Avatar alt={userProfile.firstName} src={userProfile.avatar} />}
      {!userProfile && <Skeleton variant='circle' height={40} width={40} />}
    </IconButton>
    <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleClose}>
      <MenuItem onClick={handleEditClick}>Edit Profile</MenuItem>
      <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
    </Menu>
    <Dialog open={editingProfile} onClose={() => setEditingProfile(false)}>
      <div className='header-style'>
        <DialogTitle className='title-style'>Edit profile</DialogTitle>
        <IconButton onClick={() => setEditingProfile(false)}><CloseIcon /></IconButton>
      </div>
      <EditProfile onClose={() => setEditingProfile(false)} />
    </Dialog>
    </>
  )
}

export default TopMenu
