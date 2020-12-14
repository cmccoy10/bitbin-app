import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';


const theme = createMuiTheme({
  background: '#2C3849',
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
//   typography: {
//     fontFamily: [
//       'Work Sans',
//       'sans-serif',
//     ].join(','),
//     fontWeight: 400
//   },
});

const Theme = props => {
  return (
    <ThemeProvider theme={theme}>
      {props.children}
    </ThemeProvider>
  )
}

export default Theme;
