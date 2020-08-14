import React, { useState, useEffect, useContext } from 'react'
import { Grid } from '@material-ui/core'
import UserCard from './UserCard'
import SkeletonCards from './SkeletonCards'
import { UsersContext } from '../contexts/Users'
import BackButton from './BackButton'

const UsersList = () => {
  const { users, getUsersFunction } = useContext(UsersContext)
  const [loading, setLoading] = useState(false)

  const fetchUsers = () => {
    setLoading(true)
    getUsersFunction()
    setLoading(false)
  }

  useEffect(() => { fetchUsers() }, [])

  return (
    <>
      <BackButton />
      <Grid className='grid-container' container spacing={2}>
        {loading && <SkeletonCards />}
        {!loading && users.map((user, index) => <UserCard key={index} user={user} />)}
      </Grid>
    </>
  )
}

export default UsersList
