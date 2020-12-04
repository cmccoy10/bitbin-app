import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
const latoRegular =  "'Lato', sans-serif";


const theme = createMuiTheme({
  background: '#2C3849',
  fontFamily: latoRegular,
  palette: {
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: '#2C3849'
    },
    delete: {
      main: "#e31c1b"
    }
  },
  typography: {
    fontFamily: latoRegular,
    color: "#FFFFFF"
  }
});

const Theme = props => {
  return (
    <ThemeProvider theme={theme}>
      {props.children}
    </ThemeProvider>
  )
}

export default Theme;
