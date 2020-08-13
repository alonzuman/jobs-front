import React, { useState, useContext } from 'react'
import PersonalInformation from './ProfileFields/PersonalInformation'
import { AuthContext } from '../contexts/Auth'
import { Button, CircularProgress, Dialog, DialogTitle, IconButton } from '@material-ui/core'
import { editUser } from '../firebase'
import { AlertContext } from '../contexts/Alert'
import CloseIcon from '@material-ui/icons/Close';

const EditProfile = () => {
  const [isUploading, setIsUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const { editingProfile, setEditingProfile, userProfile, setUserProfile, currentUser } = useContext(AuthContext)
  const { setAlertFunction, invalidInputAlert } = useContext(AlertContext)
  const { uid } = currentUser
  const [firstName, setFirstName] = useState(userProfile.firstName)
  const [lastName, setLastName] = useState(userProfile.lastName)
  const [phone, setPhone] = useState(userProfile.phone)
  const [bio, setBio] = useState(userProfile.bio)
  const [skills, setSkills] = useState(userProfile.skills)
  const [avatar, setAvatar] = useState(userProfile.avatar)

  const handleSubmit = async e => {
    e.preventDefault()
    if (firstName.trim().length === 0) return invalidInputAlert('title')
    if (lastName.trim().length === 0) return invalidInputAlert('description')
    if (phone.trim().length === 0) return invalidInputAlert('location')
    if (bio.trim().length === 0) return invalidInputAlert('contact')
    if (skills.length === 0) return invalidInputAlert('requirements')

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
      setEditingProfile(false)
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
    <Dialog open={editingProfile} onClose={() => setEditingProfile(false)}>
      <div className='header-style'>
        <DialogTitle className='title-style'>
          Edit profile
        </DialogTitle>
        <IconButton onClick={() => setEditingProfile(false)}>
          <CloseIcon />
        </IconButton>
      </div>
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
          isUploading={isUploading}
          setIsUploading={setIsUploading}
        />
        <Button disabled={isUploading} className='button' onClick={e => handleSubmit(e)} variant='contained' color='primary'>
          {loading ? <CircularProgress color='default' className='small-spinner' /> : 'Update'}
        </Button>
      </div>
    </Dialog>
  )
}

export default EditProfile
