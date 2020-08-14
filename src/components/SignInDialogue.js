import React, { useContext } from 'react'
import { Dialog } from '@material-ui/core'
import SignIn from '../pages/SignIn'
import { AuthContext } from '../contexts/Auth'

const SignInDialogue = () => {
  const { authState, closeDialogues } = useContext(AuthContext)

  return (
    <Dialog open={authState.isSigningIn} onClose={closeDialogues}>
      <SignIn />
    </Dialog>
  )
}

export default SignInDialogue
