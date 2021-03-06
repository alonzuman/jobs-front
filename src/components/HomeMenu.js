import React, { useState, useContext } from 'react'

// RelevantIcons
import AddIcon from '@material-ui/icons/Add'
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SettingsIcon from '@material-ui/icons/Settings';
import { Avatar } from '@material-ui/core';
import { AuthContext } from '../contexts/Auth';
import { JobsContext } from '../contexts/Jobs';
import { DialoguesContext } from '../contexts/Dialogues';

export default function HomeMenu() {
  const { setEditProfileDialog, setOpenSettingsDialog, setPostingJobDialog } = useContext(DialoguesContext)
  const { setPosting } = useContext(JobsContext)
  const { authState } = useContext(AuthContext)
  const [open, setOpen] = useState(false);

  const actions = [
    { icon: <Avatar src={authState.avatar} alt={authState?.firstName} />, name: 'Profile', handleClick: () => setEditProfileDialog(true) },
    { icon: <AddIcon />, name: 'Add', handleClick: () => setPostingJobDialog(true) },
    { icon: <SettingsIcon />, handleClick: () => setOpenSettingsDialog(true), name: 'Settings' },
  ];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        icon={<SpeedDialIcon icon={<MenuIcon />} openIcon={<CloseIcon />} />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.handleClick}
          />
        ))}
      </SpeedDial>
  );
}

