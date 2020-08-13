import React, { useState, useContext } from 'react'

// RelevantIcons
import AddIcon from '@material-ui/icons/Add'
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { Avatar } from '@material-ui/core';
import { AuthContext } from '../contexts/Auth';
import { JobsContext } from '../contexts/Jobs';

export default function HomeMenu() {
  const { setPosting } = useContext(JobsContext)
  const { userProfile, setEditingProfile } = useContext(AuthContext)
  const [open, setOpen] = useState(false);

  const actions = [
    { icon: <AddIcon />, name: 'Add', handleClick: setPosting },
    { icon: <Avatar src={userProfile.avatar} alt={userProfile?.firstName} />, name: 'Profile', handleClick: setEditingProfile }
    // { icon: <FavoriteIcon />, name: 'Saved' },
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

