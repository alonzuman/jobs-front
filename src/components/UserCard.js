import React from 'react'
import { Card, CardHeader, Avatar, CardContent, Typography, CardActions, Button, Grid } from '@material-ui/core'

const UserCard = ({ user }) => {
  return (
    <Grid xs={12} md={6} item>
      <Card>
        <CardHeader
          avatar={<Avatar src={user.avatar || ''} alt={user.firstName} />}
          title={user.firstName}
        />
        <CardContent>
          <Typography variant='body2'>
            {user.bio && user.bio}
          </Typography>
        </CardContent>
        <CardActions>
          <Button className='button'>
            Contact
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default UserCard
