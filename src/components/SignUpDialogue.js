import React, { useContext } from 'react'
import SignUp from '../pages/SignUp'
import { AuthContext } from '../contexts/Auth'
import { Dialog } from '@material-ui/core'

const SignUpDialogue = () => {
  const { closeDialogues, authState } = useContext(AuthContext)

  return (
    <Dialog open={authState.isSigningUp} onClose={closeDialogues}>
      <SignUp />
    </Dialog>
  )
}

export default SignUpDialogue
