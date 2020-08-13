import * as firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth'
import 'firebase/storage'

const app = firebase.initializeApp({
  apiKey: "AIzaSyBlwYofd1KpSUEAaNBW50ZrBMSi-FBcCuM",
  authDomain: "jobs-51.firebaseapp.com",
  databaseURL: "https://jobs-51.firebaseio.com",
  projectId: "jobs-51",
  storageBucket: "jobs-51.appspot.com",
  messagingSenderId: "275815227889",
  appId: "1:275815227889:web:5acc97bb80f2b82e17e450",
  measurementId: "G-5ZFDZB092K"
})

export const storage = app.storage()
export const db = app.firestore()
export default app;

// AUTH ACTIONS
export const signIn = async (user) => {
  const { email, password } = user
  await app.auth().signInWithEmailAndPassword(email, password)
}

export const signUp = async (user) => {
  const { email, password } = user
  const res = await app.auth().createUserWithEmailAndPassword(email, password)
  await db.collection('users').doc(res.user.uid).set({...user, role: 1})
}

export const signOut = () => {
  app.auth().signOut()
}

export const getCurrentUser = async (id) => {
  if (id) {
    const user = await db.collection('users').doc(id).get()
    return user.data()
  }
}

export const editUser = async (user, id) => {
  await db.collection('users').doc(id).set(user)
}

export const getUsers = async () => {
  const snapshot = await db.collection('users').get()
  let users = []
  snapshot.forEach(doc => users.push(doc.data()))
  return users
}

// JOB ACTIONS
export const getJobs = async (job) => {
  const snapshot = await db.collection('jobs').get()
  let jobs = []
  snapshot.forEach(doc => jobs.push({...doc.data(), id: doc.id }))
  return jobs
}

export const postJob = (job) => {
  db.collection('jobs').add(job)
}

export const deleteJob = (id) => {
  db.collection('jobs').doc(id).delete()
}
