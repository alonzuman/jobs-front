import React, { useState, useContext } from 'react'
import { Button, Typography, CircularProgress, Stepper, StepButton, Step, Paper } from '@material-ui/core'
import { signUp } from '../firebase'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { AuthContext } from '../contexts/Auth'
import EmailAndPassword from './ProfileFields/EmailAndPassword'
import PersonalInformation from './ProfileFields/PersonalInformation'
import { AlertContext } from '../contexts/Alert'
import SkillsPicker from './ProfileFields/SkillsPicker'

// Write down the steps
function getSteps() {
  return ['Credentials', 'Personal Details', 'Pick your skills'];
}


const SignUp = () => {
  const { setAlert } = useContext(AlertContext)
  const { setIsSigningIn, currentUser } = useContext(AuthContext)

  // Form state
  const [isUploading, setIsUploading] = useState(false)
  const [completed, setCompleted] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  // Credentials
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Personal info fields
  const [avatar, setAvatar] = useState('')
  const [phone, setPhone] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [serviceYear, setServiceYear] = useState('')

  // Business info
  const [bio, setBio] = useState('')
  const [skills, setSkills] = useState([])
  const [location, setLocation] = useState('')
  const [pastJob, setPastJob] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    if (firstName.trim().length === 0) return setAlert({ type: 'error', msg: 'Please fill all the required fields properly' })
    if (lastName.trim().length === 0) return setAlert({ type: 'error', msg: 'Please fill all the required fields properly' })
    if (bio.trim().length === 0) return setAlert({ type: 'error', msg: 'Please fill all the required fields properly' })
    if (phone.trim().length === 0) return setAlert({ type: 'error', msg: 'Please fill all the required fields properly' })
    if (confirmPassword !== password) return setAlert({ type: 'error', msg: 'Please fill all the required fields properly' })

    setLoading(true)
    const user = {
      email,
      password,
      firstName,
      lastName,
      bio,
      skills,
      avatar,
      phone,
      location,
      serviceYear,
      pastJob,
    }
    try {
      signUp(user)
    } catch (error) {
      setLoading(false)
      console.log(error)
      setAlert({
        msg: 'Failed to sign up, please try again',
        type: 'error'
      })
    }
  }

  if (currentUser) {
    return <Redirect to='/' />
  }

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted() ?
        steps.findIndex((step, i) => !(i in completed)) : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleComplete = () => {
    if (email.trim().length === 0) return setAlert({ msg: 'Please fill all the required fields properly', type: 'error' })
    if (password.trim().length === 0 || password.trim().length <= 5) return setAlert({ msg: 'Please fill all the required fields properly', type: 'error' })
    if (confirmPassword.trim().length === 0) return setAlert({ msg: 'Please fill all the required fields properly', type: 'error' })
    if (confirmPassword !== password) return setAlert({ msg: 'Please fill all the required fields properly', type: 'error' })
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  return (
    <form className='form-container' noValidate>
      <Typography variant='h1'>Sign Up</Typography>
      <br />
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton completed={completed[index]}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <br />
      {activeStep === 0 &&
      <EmailAndPassword
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
      />}
      {activeStep === 1 &&
      <PersonalInformation
        email={email}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        phone={phone}
        setPhone={setPhone}
        setLastName={setLastName}
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
      />}
      {activeStep === 2 && <SkillsPicker skills={skills} setSkills={setSkills} />}
      {(completedSteps() === totalSteps() - 1) ?
      <Button disabled={isUploading || skills.length <= 2} className='button' color='primary' variant='contained' onClick={handleSubmit}>
        {loading ? <CircularProgress color='primary.light' className='small-spinner' /> : 'Submit'}
      </Button>:
        <Button className='button' variant="contained" color="primary" onClick={handleComplete}>
        Next
      </Button>}
      <br/>
      <br/>
      <Typography variant='body1'>Not signed up? <span className='anchor-link' onClick={setIsSigningIn}>Sign in</span></Typography>
    </form>
  )
}

export default withRouter(SignUp)
