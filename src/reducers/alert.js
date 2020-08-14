export const initialState = {
  isOn: false,
  msg: '',
  type: ''
}

export const alertReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case 'SET_ALERT':
      return {
        isOn: true,
        ...payload
      }
    case 'CLEAR_ALERT':
      return {
        isOn: false,
        msg: '',
        type: ''
      }
    default: return state
  }
}

