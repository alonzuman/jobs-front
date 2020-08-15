import React, { useState } from 'react'
import { Chip, Box, TextField, Button, IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'


const SkillsPicker = ({ skills, setSkills }) => {
  const [skillToAdd, setSkillToAdd] = useState('')

  const addSkill = (skillName) => {
    if (skills.length >= 5) return console.log('list too long')
    if (!skills.includes(skillName)) {
      if (skillName.trim().length !== 0) {
        setSkills([...skills, skillName])
        setSkillToAdd('')
      }
    }
  }

  return (
    <>
      {skills &&
      <Box style={{ marginBottom: '1rem' }}>
        <Box style={{ display: 'flex', alignItems: 'center'  }}>
          <TextField label='Add a skill' variant='outlined' value={skillToAdd} onChange={e => setSkillToAdd(e.target.value)} />
          <IconButton onClick={() => addSkill(skillToAdd)}><AddIcon /></IconButton>
        </Box>
        <Box style={{ marginTop: '.5rem' }}>
          {skills.map((skill, index) => <Chip
            key={index}
            style={{ margin: '.25rem' }}
            label={skill}
            onDelete={() => setSkills([...skills.filter(x => x !== skill)])}
          />)}
        </Box>
      </Box>}
    </>
  )
}

export default SkillsPicker
