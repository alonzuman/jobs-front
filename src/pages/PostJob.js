import React, { useState, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Dialog, TextField, Button, DialogTitle, CircularProgress, IconButton, CardHeader, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import FileUploader from '../components/FileUploader';
import CircularProgressWithLabel from '../components/CircularProgressWithLabel';
import { AlertContext } from '../contexts/Alert';
import { AuthContext } from '../contexts/Auth';
import { JobsContext } from '../contexts/Jobs';
import { DialoguesContext } from '../contexts/Dialogues';

const PostJob = () => {
  const { postingJob, setPostingJobDialog } = useContext(DialoguesContext)
  const { posting, setPosting, addJobFunction } = useContext(JobsContext)
  const { setAlert } = useContext(AlertContext)
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
    if (title.trim().length === 0) return setAlert({type: 'error', msg: 'Please fill all of the required fields properly.'})
    if (description.trim().length === 0) return setAlert({type: 'error', msg: 'Please fill all of the required fields properly.'})
    if (location.trim().length === 0) return setAlert({type: 'error', msg: 'Please fill all of the required fields properly.'})
    if (contact.trim().length === 0) return setAlert({type: 'error', msg: 'Please fill all of the required fields properly.'})
    if (requirements.length === 0) return setAlert({type: 'error', msg: 'Please fill all of the required fields properly.'})

    const job = {
      title,
      description,
      location,
      contact,
      requirements,
      imageUrl,
      publisher: currentUser.uid,
      dateCreated: new Date()
    }
    setLoading(true)
    try {
      addJobFunction(job)
      setAlert({
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
      setPostingJobDialog(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      setAlert({
        isOn: true,
        msg: 'Failed to post job, please try again',
        type: 'error'
      })
    }
  }

  return (
    <Dialog open={postingJob} onClose={() => setPostingJobDialog(false)}>
      <div className='header-style'>
        <DialogTitle className='title-style'>Post a new job</DialogTitle>
        <IconButton onClick={() => setPostingJobDialog(false)}><CloseIcon /></IconButton>
      </div>
      <form onSubmit={handleSubmit} className='form-container' noValidate>
        {isUploading && <CircularProgressWithLabel value={progress} />}
        {!isUploading && <FileUploader
          folder={'job-images'}
          fileName={uuidv4()}
          setImageUrl={setImageUrl}
          setProgress={setProgress}
          setIsUploading={setIsUploading}
        />}
        <TextField required variant='outlined' onChange={e => setTitle(e.target.value)} value={title} className='text-input' label='Company name' /><br />
        <TextField required variant='outlined' onChange={e => setDescription(e.target.value)} value={description} className='text-input' label='Description' /><br />
        <TextField required variant='outlined' onChange={e => setLocation(e.target.value)} value={location} className='text-input' label='Location' /><br />
        <TextField required variant='outlined' onChange={e => setContact(e.target.value)} value={contact} className='text-input' label='Contact' /><br />
        <TextField required variant='outlined' onChange={e => setRequirements(['hi', 'bye', 'guy'])} value={requirements} className='text-input' label='Requirements' /><br />
        <Button disabled={isUploading} className='button' type='submit' color='primary' variant='contained'>{loading ? <CircularProgress color='primary.light' className='small-input' /> : 'Submit'}</Button>
      </form>
    </Dialog>
  )
}

export default PostJob
