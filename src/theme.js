import { createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#7e57c2',
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem'
    }
  }
})

export default theme
