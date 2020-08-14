import React, { useContext } from 'react'
import HomeMenu from '../components/HomeMenu'
import { AuthContext } from '../contexts/Auth'
import { Typography, Button, Box } from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'
import { JobsContext } from '../contexts/Jobs'

const Home = () => {
  const { authState, setIsSigningIn } = useContext(AuthContext)
  const { posting, setPosting } = useContext(JobsContext)

  const handlePostJob = () => {
    setPosting(true)
  }

  const handleFindJob = () => {
    if (authState.isAuth) {
      return <Redirect to='/results/jobs' />
    } else {
      console.log('opening sign up dialogue')
    }
  }

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '85vh'
  }

  return (
    <Box style={containerStyle}>
      <Typography variant='h1'>A title for the page</Typography>
      <br />
      {!authState.isAuth &&
      <Box>
        <Button color='primary' variant='outlined' onClick={setIsSigningIn}>Find employees</Button>
        <Button variant='outlined' onClick={setIsSigningIn}>Find a job</Button>
      </Box>}

      {authState.isAuth &&
      <Box>
        <Link style={{ textDecoration: 'none' }} to={'/results/employees'} >
          <Button color='primary' variant='outlined'>Find employees</Button>
        </Link>
        <Link style={{ textDecoration: 'none' }} to={'/results/jobs'} >
          <Button variant='outlined'>Find a job</Button>
        </Link>
      </Box>}
      {authState.isAuth && <HomeMenu />}
    </Box>
  )
}

export default Home
