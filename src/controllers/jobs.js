import { db } from "../firebase"

// JOB ACTIONS
export const getJobs = async (job) => {
  const snapshot = await db.collection('jobs').get()
  let jobs = []
  snapshot.forEach(doc => jobs.push({ ...doc.data(), id: doc.id }))
  return jobs
}

export const postJob = async (job) => {
  const snapshot = await db.collection('jobs').add(job)
  return snapshot.id
}

export const deleteJob = (id) => {
  db.collection('jobs').doc(id).delete()
}
