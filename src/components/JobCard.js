import React, { useContext } from 'react'
import { Card, CardHeader, Avatar, CardContent, Typography, CardActions, Button, Grid } from '@material-ui/core'
import { AuthContext } from '../contexts/Auth'
import { JobsContext } from '../contexts/Jobs'

const JobCard = ({ job }) => {
  const { currentUser } = useContext(AuthContext)
  const { removeJobFunction } = useContext(JobsContext)

  return (
  <Grid xs={12} md={6} item>
      <Card className='card'>
      <CardHeader
        avatar={<Avatar src={job?.imageUrl || ''} alt={job.title} />}
        title={job.title}
        action={currentUser.uid === job.publisher && <Button onClick={() => removeJobFunction(job.id)}>Edit</Button>}
      />
      <CardContent>
        <Typography variant='body2'>
          {job.description}
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

export default JobCard
