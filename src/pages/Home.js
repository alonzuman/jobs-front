import React, { useState, useContext } from 'react'
import JobsList from '../components/JobsList'

// Components
import PostJob from './PostJob'
import EditProfile from './EditProfile'

// Mui
import { Tabs, Tab } from '@material-ui/core'

// Icons
import UsersList from '../components/UsersList'
import HomeMenu from '../components/HomeMenu'
import Settings from '../components/Settings'

const Home = () => {
  const [tabValue, setTabValue] = useState(0)
  const handleChange = (tab) => setTabValue(tab)
  return (
    <>
      <HomeMenu />
      <Tabs centered variant='fullWidth' value={tabValue} indicatorColor="primary" textColor="primary" onChange={handleChange}>
        <Tab onClick={() => setTabValue(0)} label="Jobs" />
        <Tab onClick={() => setTabValue(1)} label="Members" />
      </Tabs>
      {tabValue === 0 && <JobsList />}
      {tabValue === 1 && <UsersList />}
      <PostJob/>
      <Settings />
      <EditProfile />
    </>
  )
}

export default Home
