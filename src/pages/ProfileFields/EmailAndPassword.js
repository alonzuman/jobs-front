import React from 'react'
import { TextField } from '@material-ui/core'

const EmailAndPassword = ({ email, setEmail, password, setPassword, confirmPassword, setConfirmPassword }) => {
  return (
    <>
      <TextField required variant='outlined' className='text-input' label={`Email`} value={email} onChange={e => setEmail(e.target.value)} /><br />
      <TextField required variant='outlined' className='text-input' type='password' label={`Password`} value={password} onChange={e => setPassword(e.target.value)} /><br />
      <TextField required variant='outlined' className='text-input' type='password' label={`Confirm Password`} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} /><br />
    </>
  )
}

export default EmailAndPassword
