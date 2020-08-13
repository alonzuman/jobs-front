import React, { useState, useEffect } from 'react'
import { getJobs } from '../firebase'
import { Grid } from '@material-ui/core'
import JobCard from './JobCard'
import SkeletonCards from './SkeletonCards'

const JobsList = ({ posting }) => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchJobs = async () => {
    setLoading(true)
    const data = await getJobs()
    setJobs(data)
    setLoading(false)
  }

  useEffect(() => { fetchJobs() }, [posting])

  return (
    <>
      <Grid className='grid-container' container spacing={2}>
        {loading && <SkeletonCards />}
        {!loading && jobs.map((job, index) => <JobCard key={index} job={job} />)}
      </Grid>
    </>
  )
}

export default JobsList
