import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Button, Box, Grid, Typography } from "@material-ui/core";
import { FormControl } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { signUp } from '../../store/ducks/authentication';

const useStyles = makeStyles((theme) => ({
  splashContainer: {
    width: "100%",
    height: "93vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  bodyContainer: {
    display: "flex",
    height: "auto",
    width: "auto",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column"
  }
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
      <Grid container className={classes.bodyContainer} direction="column" alignContent="space-between">

        <Grid item>
            <Typography variant="h3">Sign Up</Typography>
        </Grid>
        <Grid item>
          <Grid container className={classes.formContainer}>
            <FormControl>
              <Input
                type='text'
                placeholder='First Name'
                value={firstName}
                onChange={updateProperty(setFirstName)}
                required
              />
              <Input
                type='text'
                placeholder='Last Name'
                value={lastName}
                onChange={updateProperty(setLastName)}
                required
              />
              <Input
                type='email'
                placeholder='Email'
                value={email}
                onChange={updateProperty(setEmail)}
                required
              />
              <Input
                type='password'
                placeholder='Password'
                value={password}
                onChange={updateProperty(setPassword)}
              />
              <Input
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={updateProperty(setConfirmPassword)}
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
