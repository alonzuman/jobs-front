import React, { useEffect, useState } from 'react'
import app, { getCurrentUser } from '../firebase'

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)

  const validateUser = async () => {
    await app.auth().onAuthStateChanged(setCurrentUser)
    if (currentUser?.uid) {
      const userData = await getCurrentUser(currentUser.uid)
      setUserProfile(userData)
    }
  }

  useEffect(() => { validateUser() }, [currentUser?.uid])

  return (
    <AuthContext.Provider value={{ currentUser, userProfile, setUserProfile }}>
      {children}
    </AuthContext.Provider>
  )
}
