import React, { useState } from 'react'
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

export const CustomThemeContext = React.createContext()

export const CustomThemeProvider = ({ children }) => {
  // We keep the theme in app state
  const [theme, setTheme] = useState({
    palette: {
      type: 'dark'
    }
  });

  const toggleDarkTheme = () => {
    let newPaletteType = theme.palette.type === 'light' ? 'dark' : 'light'
    setTheme({
      palette: {
        type: newPaletteType
      }
    });
  };

  const muiTheme = createMuiTheme(theme);

  return (
    <CustomThemeContext.Provider value={muiTheme}>
      {children}
    </CustomThemeContext.Provider>
  )
}
