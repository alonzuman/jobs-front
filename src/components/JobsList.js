import React, { useState, useEffect, useContext } from 'react'
import { Grid } from '@material-ui/core'
import JobCard from './JobCard'
import SkeletonCards from './SkeletonCards'
import { JobsContext } from '../contexts/Jobs'
import BackButton from './BackButton'

const JobsList = () => {
  const { jobs, getJobsFunction } = useContext(JobsContext)
  const [loading, setLoading] = useState(false)

  const fetchJobs = () => {
    setLoading(true)
    getJobsFunction()
    setLoading(false)
  }

  useEffect(() => { fetchJobs() }, [])

  return (
    <>
      <BackButton />
      <br />
      <br />
      <br />
      <Grid className='grid-container' container spacing={2}>
        {loading && <SkeletonCards />}
        {!loading && jobs.map((job, index) => <JobCard key={index} job={job} />)}
      </Grid>
    </>
  )
}

export default JobsList
