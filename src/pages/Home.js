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
import { AuthContext } from '../contexts/Auth'

const Home = () => {
  const { userProfile } = useContext(AuthContext)
  const [tabValue, setTabValue] = useState(0)

  const handleChange = (tab) => setTabValue(tab)

  return (
    <>
      {userProfile && <HomeMenu />}
      <Tabs centered variant='fullWidth' value={tabValue} indicatorColor="primary" textColor="primary" onChange={handleChange}>
        <Tab onClick={() => setTabValue(0)} label="Jobs" />
        <Tab onClick={() => setTabValue(1)} label="Members" />
      </Tabs>
      {tabValue === 0 && <JobsList />}
      {tabValue === 1 && <UsersList />}
      <PostJob/>
      {userProfile && <EditProfile  />}
    </>
  )
}

export default Home
