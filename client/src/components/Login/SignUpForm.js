import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Button, Box, Grid, Typography, TextField } from "@material-ui/core";
import { FormControl } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { signUp } from '../../store/ducks/authentication';

const useStyles = makeStyles((theme) => ({
  splashContainer: {
    width: "30em",
    height: "30em",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  bodyContainer: {
    display: "flex",
    height: "auto",
    width: "auto",
    flexDirection: "column",
    alignContent: "space-between"
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    width: "25em"
  },
  formHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center"
  },
  navLink: {
    textDecoration: "none",
    cursor: "pointer",
    color: "black"
  },
}));

const SignUpForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const updateProperty = (callback) => (e) => {
    callback(e.target.value);
  };

  const handleSubmit = (e) => {
    const newUser = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    };
    dispatch(signUp(newUser));
  };

  const classes = useStyles();
  return (
    <Box className={classes.splashContainer}>
      <Grid container className={classes.bodyContainer} direction="column"
      alignContent="space-between" spacing={3}>
        <Grid item>
            <Typography variant="h6">Sign Up</Typography>
        </Grid>
        <Grid item>
          <Grid container className={classes.formContainer} spacing={3}>
            <FormControl>
              <TextField
                type='text'
                placeholder='First Name'
                value={firstName}
                onChange={updateProperty(setFirstName)}
                required
                variant="outlined"
                size="small"
              />
              <TextField
                type='text'
                placeholder='Last Name'
                value={lastName}
                onChange={updateProperty(setLastName)}
                required
                variant="outlined"
                size="small"
              />
              <TextField
                type='email'
                placeholder='Email'
                value={email}
                onChange={updateProperty(setEmail)}
                required
                variant="outlined"
                size="small"
              />
              <TextField
                type='password'
                placeholder='Password'
                value={password}
                onChange={updateProperty(setPassword)}
                required
                variant="outlined"
                size="small"
              />
              <TextField
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={updateProperty(setConfirmPassword)}
                required
                variant="outlined"
                size="small"
              />
              </FormControl>
            <Button color="secondary" onClick={handleSubmit}>Sign Up</Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUpForm;
