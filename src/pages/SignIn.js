import React, { useState, useContext } from 'react'
import { TextField, Button, Typography, CircularProgress, Paper } from '@material-ui/core'
import { signIn } from '../firebase'
import { useHistory, Link, withRouter, Redirect } from 'react-router-dom'
import { AuthContext } from '../contexts/Auth'
import theme from '../theme'
import { AlertContext } from '../contexts/Alert'

const SignIn = () => {
  const { setAlertFunction } = useContext(AlertContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { currentUser } = useContext(AuthContext)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const user = { email, password }
    try {
      await signIn(user)
      setAlertFunction({
        isOn: true,
        msg: 'Welcome!',
        type: 'success'
      })
      setLoading(false)
    } catch (error) {
      console.log(error)
      // TODO switch case on error type
      setAlertFunction({
        isOn: true,
        msg: 'Failed to log in, please try again',
        type: 'error'
      })
      setLoading(false)
    }
  }

  const anchorStyle = {
    textDecoration: 'none',
    color: theme.palette.primary.main
  }

  if (currentUser) {
    return <Redirect to='/' />
  }

  const paperStyle = {
    maxWidth: 500,
    margin: '0 auto'
  }

  return (
    <>
      <Paper className='paper-container-style'>
        <form className='form-container' noValidate>
          <Typography variant='h1'>Sign In</Typography>
          <br />
          <TextField variant='outlined' className='text-input' label={`Email`} value={email} onChange={e => setEmail(e.target.value)} /><br />
          <TextField variant='outlined' className='text-input' type='password' label={`Password`} value={password} onChange={e => setPassword(e.target.value)} /><br />
          <Button className='button' color='primary' variant='contained' onClick={handleSubmit}>{loading ? <CircularProgress color='primary.light' className='small-spinner'/> : 'Submit' }</Button>
          <br />
          <br />
          <Typography variant='body1'>Not signed up? <Link style={anchorStyle} to='/signup'>Sign up</Link></Typography>
        </form>
      </Paper>
    </>
  )
}

export default withRouter(SignIn)
