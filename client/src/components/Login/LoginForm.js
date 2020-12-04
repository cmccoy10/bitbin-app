import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { Input, Button, Box, Grid, Typography } from "@material-ui/core";
import { FormControl } from '@material-ui/core';
import { login } from '../../store/ducks/authentication';

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
    flexDirection: "column",
    alignContent: "space-between"
  },
  formContainer: {
    display: "flex",
    flexDirection: "column"
  }
}));

const LoginForm = () => {
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password');
  const token = useSelector((state) => state.authentication.token);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    // e.preventDefault();
    dispatch(login(email, password));
  };

  const updateProperty = (callback) => (e) => {
    callback(e.target.value);
  };

  const classes = useStyles();

  if (token) {
    return <Redirect to='/' />;
  }

  return (
    <Box className={classes.splashContainer}>
      <Grid container className={classes.bodyContainer}>
        <Grid item>
          <Typography variant="h3">Log In</Typography>
        </Grid>
        <Grid item>
          <Grid container className={classes.formContainer}>
            <FormControl >
              {/* <InputLabel>Email Address</InputLabel> */}
              <Input
                type='text'
                placeholder='Email'
                value={email}
                required
                onChange={updateProperty(setEmail)}
              />
              {/* <InputLabel>Password</InputLabel> */}
              <Input
                type='password'
                placeholder='Password'
                value={password}
                required
                onChange={updateProperty(setPassword)}
              />
              <Button color="secondary" onClick={handleSubmit} >Login</Button>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginForm;
