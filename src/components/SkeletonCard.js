import React from 'react'
import { Card, CardHeader, CardContent, CardActions, Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

const SkeletonCard = () => {
  return (
    <Grid style={{ height: 'fit-content' }} item xs={12} md={6}>
      <Card style={{height: 'fit-content'}} className='card'>
        <CardHeader
          avatar={<Skeleton variant="circle" width={40} height={40} />}
          title={<Skeleton variant='text' width={120} />}
        />
        <CardContent>
          <Skeleton variant='text' />
          <Skeleton variant='text' />
          <Skeleton variant='text' />
        </CardContent>
        <CardActions>
          <Skeleton variant="rect" width={'100%'} height={36} />
        </CardActions>
      </Card>
    </Grid>
  )
}

export default SkeletonCard
