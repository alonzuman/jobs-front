import React, { useState, useContext } from 'react'
import JobsList from '../components/JobsList'

// Components
import PostJob from './PostJob'
import TopMenu from '../components/TopMenu'

// Mui
import { Button, IconButton, Box, Typography, Paper, Tabs, Tab, Fab } from '@material-ui/core'

// Icons
import AddIcon from '@material-ui/icons/Add'
import UsersList from '../components/UsersList'
import theme from '../theme'

const Home = () => {
  const [posting, setPosting] = useState(false)
  const [tabValue, setTabValue] = useState(0)

  const addButtonStyle = {
    position: 'fixed',
    bottom: '1rem',
    right: '1rem',
    zIndex: 999,
    backgroundColor: theme.palette.primary.main
  }

  const handleChange = (tab) => setTabValue(tab)

  return (
    <>
      <TopMenu />
      <Fab onClick={() => setPosting(true)} style={addButtonStyle} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
        <Tabs centered variant='fullWidth' value={tabValue} indicatorColor="primary" textColor="primary" onChange={handleChange}>
          <Tab onClick={() => setTabValue(0)} label="Jobs" />
          <Tab onClick={() => setTabValue(1)} label="Members" />
        </Tabs>
      {tabValue === 0 && <JobsList posting={posting} />}
      {tabValue === 1 && <UsersList />}
      <PostJob open={posting} onClose={() => setPosting(false)} />
    </>
  )
}

export default Home
