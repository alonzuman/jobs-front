import React, { useState, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Dialog, TextField, Button, DialogTitle, CircularProgress, IconButton, CardHeader, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import { postJob } from '../firebase'
import FileUploader from '../components/FileUploader';
import CircularProgressWithLabel from '../components/CircularProgressWithLabel';
import { AlertContext } from '../contexts/Alert';
import { AuthContext } from '../contexts/Auth';

const PostJob = ({ open, onClose }) => {
  const { setAlertFunction } = useContext(AlertContext)
  const { currentUser } = useContext(AuthContext)
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [imageUrl, setImageUrl] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [contact, setContact] = useState('')
  const [requirements, setRequirements] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    // TODO fix the image url bug
    const job = {
      title,
      description,
      location,
      contact,
      requirements,
      imageUrl,
      publisher: currentUser.uid,
      dateCreated: new Date
    }
    setLoading(true)
    try {
      postJob(job)
      // TODO set alert
      setAlertFunction({
        isOn: true,
        msg: 'Job posted!',
        type: 'success'
      })
      setLoading(false)
      setTitle('')
      setDescription('')
      setLocation('')
      setContact('')
      setRequirements([])
      onClose(true)
    } catch (error) {
      setLoading(false)
      console.log(error)
      // TODO set alert
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <div className='header-style'>
        <DialogTitle className='title-style'>Post a new job</DialogTitle>
        <IconButton onClick={onClose}><CloseIcon /></IconButton>
      </div>
      <form onSubmit={handleSubmit} className='form-container' noValidate>
        {isUploading && <CircularProgressWithLabel value={progress} />}
        <FileUploader
          folder={'job-images'}
          fileName={uuidv4()}
          setImageUrl={setImageUrl}
          setProgress={setProgress}
          setIsUploading={setIsUploading}
        />
        <TextField variant='outlined' onChange={e => setTitle(e.target.value)} value={title} className='text-input' label='Company name' /><br />
        <TextField variant='outlined' onChange={e => setDescription(e.target.value)} value={description} className='text-input' label='Description' /><br />
        <TextField variant='outlined' onChange={e => setLocation(e.target.value)} value={location} className='text-input' label='Location' /><br />
        <TextField variant='outlined' onChange={e => setContact(e.target.value)} value={contact} className='text-input' label='Contact' /><br />
        <TextField variant='outlined' onChange={e => setRequirements(['hi', 'bye', 'guy'])} value={requirements} className='text-input' label='Requirements' /><br />
        <Button className='button' type='submit' color='primary' variant='contained'>{loading ? <CircularProgress color='primary.light' className='small-input' /> : 'Submit'}</Button>
      </form>
    </Dialog>
  )
}

export default PostJob
