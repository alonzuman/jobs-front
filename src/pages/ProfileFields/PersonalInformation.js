import React, { useState } from 'react'
import { TextField } from '@material-ui/core'
import FileUploader from '../../components/FileUploader'
import CircularProgressWithLabel from '../../components/CircularProgressWithLabel'

const PersonalInformation = ({ email, setAvatar, firstName, setFirstName, lastName, setLastName, bio, setBio, skills, setSkills, phone, setPhone }) => {
  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const flexStyle = {
    display: 'flex',
    gap: '.25rem',
    justifyContent: 'flex-start',
    width: '100%'
  }

  return (
    <>
      {isUploading && <CircularProgressWithLabel value={progress} />}
      {!isUploading &&
      <FileUploader
        folder={'avatars'}
        fileName={`${email}'s avatar`}
        setImageUrl={setAvatar}
        setProgress={setProgress}
        setIsUploading={setIsUploading}
      />}
      <div style={flexStyle}>
        <TextField variant='outlined' className='text-input' label={`First Name`} value={firstName} onChange={e => setFirstName(e.target.value)} /><br />
        <TextField variant='outlined' className='text-input' label={`Last Name`} value={lastName} onChange={e => setLastName(e.target.value)} /><br />
      </div>
      <TextField variant='outlined' className='text-input' label={`Phone Number`} value={phone} onChange={e => setPhone(e.target.value)} /><br />
      <TextField variant='outlined' className='text-input' label={`Bio`} value={bio} onChange={e => setBio(e.target.value)} /><br />
      <TextField variant='outlined' className='text-input' label={`Skills`} value={skills} onChange={e => setSkills(e.target.value)} /><br />
    </>
  )
}

export default PersonalInformation
