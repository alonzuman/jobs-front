import React, { useState, useEffect } from 'react'
import { getUsers } from '../firebase'
import { Grid } from '@material-ui/core'
import UserCard from './UserCard'
import SkeletonCards from './SkeletonCards'

const UsersList = () => {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    setLoading(true)
    const data = await getUsers()
    setUsers(data)
    setLoading(false)
  }

  useEffect(() => { fetchUsers() }, [])

  return (
    <Grid className='grid-container' container spacing={2}>
      {loading && <SkeletonCards />}
      {!loading && users.map((user, index) => <UserCard key={index} user={user} />)}
    </Grid>
  )
}

export default UsersList
