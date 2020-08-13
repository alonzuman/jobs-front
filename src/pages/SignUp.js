import React, { useState, useContext } from 'react'
import { Button, Typography, CircularProgress, Stepper, StepButton, Step, Paper } from '@material-ui/core'
import { signUp } from '../firebase'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { AuthContext } from '../contexts/Auth'
import theme from '../theme'
import EmailAndPassword from './ProfileFields/EmailAndPassword'
import PersonalInformation from './ProfileFields/PersonalInformation'
import { AlertContext } from '../contexts/Alert'

// Write down the steps
function getSteps() {
  return ['Credentials', 'Personal Details'];
}


const SignUp = () => {
  const { invalidInputAlert, setAlertFunction } = useContext(AlertContext)
  const [completed, setCompleted] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [avatar, setAvatar] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [bio, setBio] = useState('')
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(false)
  const steps = getSteps();
  const { currentUser } = useContext(AuthContext)

  const handleSubmit = async e => {
    e.preventDefault()
    if (firstName.trim().length === 0) return invalidInputAlert('email')
    if (lastName.trim().length === 0) return invalidInputAlert('password')
    if (bio.trim().length === 0) return invalidInputAlert('bio')
    if (phone.trim().length === 0) return invalidInputAlert('phone')
    if (confirmPassword !== password) return setAlertFunction({ isOn: true, type: 'error', msg: 'Passwords dont match' })
    setLoading(true)
    const user = {
      email,
      password,
      firstName,
      lastName,
      bio,
      skills,
      avatar,
      phone
    }
    try {
      signUp(user)
    } catch (error) {
      setLoading(false)
      console.log(error)
      setAlertFunction({
        isOn: true,
        msg: 'Failed to sign up, please try again',
        type: 'error'
      })
    }
  }

  if (currentUser) {
    return <Redirect to='/' />
  }

  const anchorStyle = {
    textDecoration: 'none',
    color: theme.palette.primary.main
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

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    if (email.trim().length === 0) return invalidInputAlert('email')
    if (password.trim().length === 0 || password.trim().length <= 5) return invalidInputAlert('password')
    if (confirmPassword.trim().length === 0) return invalidInputAlert('')
    if (confirmPassword !== password) return setAlertFunction({ isOn: true, type: 'error', msg: 'Passwords dont match' })
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  return (
    <Paper className='paper-container-style'>
    <form className='form-container' noValidate>
      <Typography variant='h1'>Sign Up</Typography>
      <br />
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton onClick={handleStep(index)} completed={completed[index]}>
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
      />}
      {(completedSteps() === totalSteps() - 1) ?
      <Button className='button' color='primary' variant='contained' onClick={handleSubmit}>
        {loading ? <CircularProgress color='primary.light' className='small-spinner' /> : 'Submit'}
      </Button>:
        <Button className='button' variant="contained" color="primary" onClick={handleComplete}>
        Next
      </Button>}
      <br/>
      <br/>
      <Typography variant='body1'>Not signed up? <Link style={anchorStyle} to='/signin'>Sign in</Link></Typography>
    </form>
    </Paper>
  )
}

export default withRouter(SignUp)
