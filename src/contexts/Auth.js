import React, { useEffect, useState } from 'react'
import app, { getCurrentUser } from '../firebase'

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [editingProfile, setEditingProfile] = useState(false)
  const [openSettings, setOpenSettings] = useState(false)
  const [theme, setTheme] = useState({
    palette: {
      type: localStorage.getItem('theme') || 'dark',
      primary: {
        main: '#7e57c2',
      }
    },
    typography: {
      h1: {
        fontSize: '2.5rem'
      }
    }
  })

  useEffect(() => { validateUser() }, [currentUser?.uid])
  useEffect(() => {
    document.querySelector('body').style.backgroundColor = theme.palette.type === 'dark' ? '#333333' : 'white'
    document.querySelector('.background-paper').style.backgroundColor = theme.palette.type === 'dark' ? '#333333' : 'white'
  })

  const validateUser = async () => {
    await app.auth().onAuthStateChanged(setCurrentUser)
    if (currentUser?.uid) {
      const userData = await getCurrentUser(currentUser.uid)
      setUserProfile(userData)
    }
  }

  const toggleTheme = () => {
    let newPaletteType = theme.palette.type === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', theme.palette.type === 'light' ? 'dark' : 'light')
    setTheme({
      ...theme,
      palette: {
        ...theme.palette,
        type: newPaletteType
      },
    });
  };

  // TODO move signin, signup, editprofile to here

  const value = {
    currentUser,
    userProfile,
    setUserProfile,
    editingProfile,
    setEditingProfile,
    theme,
    toggleTheme,
    openSettings,
    setOpenSettings
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
