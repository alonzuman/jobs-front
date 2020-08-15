import React from 'react'
import { Card, CardHeader, Avatar, CardContent, Typography, CardActions, Button, Grid, Box, Chip } from '@material-ui/core'

const UserCard = ({ user }) => {
  console.log(user)

  return (
    <Grid xs={12} md={6} item>
      <Card>
        <CardHeader
          avatar={<Avatar src={user.avatar || ''} alt={user.firstName} />}
          title={`${user.firstName} ${user.lastName}`}
          subheader={user.location}
        />
        <CardContent>
          <Typography variant='body2'>
            {user.bio}
          </Typography>
          <Box>
            {user.skills?.map((skill, index) => <Chip style={{margin: '.25rem'}} key={index} label={skill} />)}
          </Box>
        </CardContent>
        <CardActions>
          <Button variant='outlined' color='primary' className='button'>
            Contact
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default UserCard
