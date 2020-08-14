import React, { useReducer } from 'react'
import { reducer, initialState } from '../reducers/count'

export const CountContext = React.createContext()
export const CountProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const increment = () => dispatch({ type: 'increment' })

  const value = {
    countState: state,
    increment
  }

  return (
    <CountContext.Provider value={value}>
      {children}
    </CountContext.Provider>
  )
}
