export const initialState = {
  isAuth: false,
  isSigningIn: false,
  isSigningUp: false,
  avatar: '',
  firstName: '',
  lastName: '',
  phone: '',
  skills: [],
  loading: false,
}

export const authReducer = (state, action) => {
  const { type,  payload } = action

  switch (type) {
    case 'AUTH_LOADING':
      return {
        ...state,
        loading: true
      }
    case 'SIGNING_IN':
      return {
        ...state,
        isSigningIn: true,
        isSigningUp: false
      }
    case 'SIGNING_UP' :
      return {
        ...state,
        isSigningUp: true,
        isSigningIn: false,
      }
    case 'CLOSE_DIALOGUES':
      return {
        ...state,
        isSigningUp: false,
        isSigningIn: false
      }
    case 'SET_USER':
    case 'UPDATE_USER':
    case 'SIGN_UP':
    case 'SIGN_IN':
      return {
        isAuth: true,
        ...payload,
        loading: false
      }
    case 'SIGN_OUT':
      return {
        isAuth: false,
        ...initialState,
        loading: false
      }
    default: return state
  }
}
