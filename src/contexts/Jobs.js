import React, { useState } from 'react'
import { deleteJob, postJob, getJobs } from '../firebase'

export const JobsContext = React.createContext()

export const JobsProvider = ({ children }) => {
  const [posting, setPosting] = useState(false)
  const [jobs, setJobs] = useState([])

  const getJobsFunction = async (filters) => {
    const data = await getJobs(filters)
    setJobs([...data])
  }

  const addJobFunction = async (job) => {
    const id = await postJob(job)
    const addedJob = {...job, id}
    setJobs([...jobs, addedJob])
  }

  const removeJobFunction = async (id) => {
    await deleteJob(id)
    setJobs([...jobs.filter(job => job.id !== id)])
  }

  const value = {
    jobs,
    setJobs,
    removeJobFunction,
    addJobFunction,
    getJobsFunction,
    posting,
    setPosting
  }

  return (
    <JobsContext.Provider value={value}>
      {children}
    </JobsContext.Provider>
  )
}
