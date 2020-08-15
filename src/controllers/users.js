import app, { db } from "../firebase"

// AUTH ACTIONS
export const signIn = async (user) => {
  const { email, password } = user
  await app.auth().signInWithEmailAndPassword(email, password)
}

export const signUp = async (user) => {
  const { email, password } = user
  const res = await app.auth().createUserWithEmailAndPassword(email, password)
  await db.collection('users').doc(res.user.uid).set({ ...user, role: 1, dateCreated: new Date() })
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
