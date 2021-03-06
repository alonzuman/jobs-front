import React, { useState, useContext } from 'react'
import PersonalInformation from './ProfileFields/PersonalInformation'
import { AuthContext } from '../contexts/Auth'
import { Button, CircularProgress, Dialog, DialogTitle, IconButton } from '@material-ui/core'
import { editUser } from '../firebase'
import { AlertContext } from '../contexts/Alert'
import CloseIcon from '@material-ui/icons/Close';
import { DialoguesContext } from '../contexts/Dialogues'
import SkillsPicker from './ProfileFields/SkillsPicker'

const EditProfile = () => {
  const { editingProfile, setEditProfileDialog } = useContext(DialoguesContext)
  const { updateUser, authState, currentUser } = useContext(AuthContext)
  const { uid } = currentUser
  const { setAlert } = useContext(AlertContext)
  const [isUploading, setIsUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [firstName, setFirstName] = useState(authState?.firstName)
  const [lastName, setLastName] = useState(authState?.lastName)
  const [phone, setPhone] = useState(authState?.phone)
  const [bio, setBio] = useState(authState?.bio)
  const [skills, setSkills] = useState(authState?.skills)
  const [avatar, setAvatar] = useState(authState?.avatar)
  const [location, setLocation] = useState(authState?.location)
  const [serviceYear, setServiceYear] = useState(authState?.serviceYear)
  const [pastJob, setPastJob] = useState(authState?.pastJob)


  const handleSubmit = async e => {
    e.preventDefault()
    if (firstName.trim().length === 0) return setAlert({type: 'error', msg: 'Please fill all of the required fields properly.'})
    if (lastName.trim().length === 0) return setAlert({type: 'error', msg: 'Please fill all of the required fields properly.'})
    if (phone.trim().length === 0) return setAlert({type: 'error', msg: 'Please fill all of the required fields properly.'})
    if (bio.trim().length === 0) return setAlert({type: 'error', msg: 'Please fill all of the required fields properly.'})
    if (skills.length === 0) return setAlert({type: 'error', msg: 'Please fill all of the required fields properly.'})

    setLoading(true)
    const user = {
      firstName, lastName, phone, bio, skills, avatar, location, serviceYear, pastJob
    }

    try {
      await editUser(user, uid)
      updateUser(user)
      setAlert({
        isOn: true,
        msg: 'Profile updated successfully!',
        type: 'success'
      })
      setLoading(false)
      setEditProfileDialog(false)
    } catch (error) {
      console.log(error)
      setAlert({
        isOn: true,
        msg: 'Failed to update profile, please try again',
        type: 'error'
      })
    }
  }

  return (
    <Dialog open={editingProfile} onClose={() => setEditProfileDialog(false)}>
      <div className='header-style'>
        <DialogTitle className='title-style'>
          Edit profile
        </DialogTitle>
        <IconButton onClick={() => setEditProfileDialog(false)}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className='form-container'>
        <PersonalInformation
          email={authState?.email}
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
          location={location}
          setLocation={setLocation}
          serviceYear={serviceYear}
          setServiceYear={setServiceYear}
          pastJob={pastJob}
          setPastJob={setPastJob}
          isUploading={isUploading}
          setIsUploading={setIsUploading}
        />
        <SkillsPicker skills={skills} setSkills={setSkills} />
        <Button disabled={isUploading || skills.length === 0} className='button' onClick={e => handleSubmit(e)} variant='contained' color='primary'>
          {loading ? <CircularProgress color='default' className='small-spinner' /> : 'Update'}
        </Button>
      </div>
    </Dialog>
  )
}

export default EditProfile
