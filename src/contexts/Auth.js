import React, { useEffect, useState, useReducer } from 'react'
import app, { getCurrentUser } from '../firebase'
import { authReducer, initialState } from '../reducers/auth'
import { signOut } from '../controllers/users'

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)
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

  useEffect(() => { setUser() }, [currentUser?.uid])
  useEffect(() => {
    document.querySelector('body').style.backgroundColor = theme.palette.type === 'dark' ? '#333333' : 'white'
    document.querySelector('.background-paper').style.backgroundColor = theme.palette.type === 'dark' ? '#333333' : 'white'
  })

  const setUser = async () => {
    dispatch({ type: 'AUTH_LOADING' })
    await app.auth().onAuthStateChanged(setCurrentUser)
    if (currentUser?.uid) {
      const userData = await getCurrentUser(currentUser.uid)
      dispatch({ type: 'SET_USER', payload: { ...userData } })
    }
  }

  const updateUser = async (user) => {
    dispatch({ type: 'AUTH_LOADING' })
    try {
      // Firebase stuff here
      dispatch({
        type: 'UPDATE_USER',
        payload: { ...user }
      })
    } catch (error) {
      // TODO error
    }
  }

  const logOut = () => {
    signOut()
    dispatch({ type: 'SIGN_OUT' })
  }

  const setIsSigningUp = () => dispatch({ type: 'SIGNING_UP'})
  const setIsSigningIn = () => dispatch({ type: 'SIGNING_IN' })
  const closeDialogues = () => dispatch({ type: 'CLOSE_DIALOGUES' })

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


  const value = {
    authState: state,
    currentUser,
    editingProfile,
    setEditingProfile,
    theme,
    toggleTheme,
    openSettings,
    setOpenSettings,
    // Actions
    updateUser,
    logOut,
    setIsSigningIn,
    setIsSigningUp,
    closeDialogues
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
