import React, { useState } from 'react'
import { getUsers } from '../controllers/users'

export const UsersContext = React.createContext()

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([])

  const getUsersFunction = async (filters) => {
    const data = await getUsers()
    setUsers([...data])
  }

  return (
    <UsersContext.Provider value={{ users, setUsers, getUsersFunction }}>
      {children}
    </UsersContext.Provider>
  )
}
