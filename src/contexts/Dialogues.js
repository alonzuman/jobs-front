import React, { useState } from 'react'

export const DialoguesContext = React.createContext()

export const DialoguesProvider = ({ children }) => {
  const [editingProfile, setEditingProfile] = useState(false)
  const [postingJob, setPostingJob] = useState(false)
  const [openSettings, setOpenSettings] = useState(false)

  const setEditProfileDialog = (val) => setEditingProfile(val)
  const setOpenSettingsDialog = (val) => setOpenSettings(val)
  const setPostingJobDialog = (val) => setPostingJob(val)

  const value = {
    editingProfile,
    setEditProfileDialog,
    postingJob,
    setPostingJobDialog,
    openSettings,
    setOpenSettingsDialog
  }

  return (
    <DialoguesContext.Provider value={value}>
      {children}
    </DialoguesContext.Provider>
  )
}
