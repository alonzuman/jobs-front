import React, { useState } from 'react'
import { TextField } from '@material-ui/core'
import FileUploader from '../../components/FileUploader'
import CircularProgressWithLabel from '../../components/CircularProgressWithLabel'

const PersonalInformation = ({
  isUploading,
  setIsUploading,
  email,
  setAvatar,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  bio,
  setBio,
  phone,
  setPhone,
  location,
  setLocation,
  serviceYear,
  setServiceYear,
  pastJob,
  setPastJob
}) => {
  const [progress, setProgress] = useState(0)

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
      <div style={flexStyle}>
        <TextField variant='outlined' className='text-input' label={`Phone Number`} value={phone} onChange={e => setPhone(e.target.value)} /><br />
        <TextField variant='outlined' className='text-input' label={`Location`} value={location} onChange={e => setLocation(e.target.value)} /><br />
      </div>
      <div style={flexStyle}>
        <TextField variant='outlined' className='text-input' label={`Year of service`} value={serviceYear} onChange={e => setServiceYear(e.target.value)} /><br />
        <TextField variant='outlined' className='text-input' label={`Past position`} value={pastJob} onChange={e => setPastJob(e.target.value)} /><br />
      </div>
      <TextField variant='outlined' className='text-input' label={`Bio`} value={bio} onChange={e => setBio(e.target.value)} /><br />
    </>
  )
}

export default PersonalInformation
