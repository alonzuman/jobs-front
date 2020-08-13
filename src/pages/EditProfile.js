import React, { useState, useContext, useReducer } from 'react'
import PersonalInformation from './ProfileFields/PersonalInformation'
import { AuthContext } from '../contexts/Auth'
import { Button, CircularProgress } from '@material-ui/core'
import { editUser } from '../firebase'
import { AlertContext } from '../contexts/Alert'

const EditProfile = ({ onClose }) => {
  const [loading, setLoading] = useState(false)
  const { userProfile, setUserProfile, currentUser } = useContext(AuthContext)
  const { setAlertFunction } = useContext(AlertContext)
  const { uid } = currentUser
  const [firstName, setFirstName] = useState(userProfile.firstName)
  const [lastName, setLastName] = useState(userProfile.lastName)
  const [phone, setPhone] = useState(userProfile.phone)
  const [bio, setBio] = useState(userProfile.bio)
  const [skills, setSkills] = useState(userProfile.skills)
  const [avatar, setAvatar] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const user = {
      firstName, lastName, phone, bio, skills, avatar
    }

    try {
      await editUser(user, uid)
      setUserProfile(user)
      setAlertFunction({
        isOn: true,
        msg: 'Profile updated successfully!',
        type: 'success'
      })
      setLoading(false)
      onClose(true)
    } catch (error) {
      console.log(error)
      setAlertFunction({
        isOn: true,
        msg: 'Failed to update profile, please try again',
        type: 'error'
      })
    }
  }

  return (
    <div className='form-container'>
      <PersonalInformation
        email={currentUser.email}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        phone={phone}
        setPhone={setPhone}
        bio={bio}
        setBio={setBio}
        skills={skills}
        setSkills={setSkills}
        setAvatar={setAvatar}
      />
      <Button className='button' onClick={e => handleSubmit(e)} variant='contained' color='primary'>
        {loading ? <CircularProgress color='default' className='small-spinner' /> : 'Submit'}
      </Button>
    </div>
  )
}

export default EditProfile
