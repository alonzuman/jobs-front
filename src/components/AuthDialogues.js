import React, { useContext } from 'react'
import SignUpDialogue from './SignUpDialogue'
import SignInDialogue from './SignInDialogue'
import { AuthContext } from '../contexts/Auth'

const AuthDialogues = () => {
  const { authState } = useContext(AuthContext)
  const { isSigningUp, isSigningIn } = authState
  return (
    <>
      {isSigningUp && <SignUpDialogue />}
      {isSigningIn && <SignInDialogue />}
    </>
  )
}

export default AuthDialogues
