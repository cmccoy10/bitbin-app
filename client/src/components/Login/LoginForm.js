import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { Input, Button, Box, Grid, Typography, TextField, Link } from "@material-ui/core";
import { FormControl } from '@material-ui/core';
import { login } from '../../store/ducks/authentication';

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
    height: "15em",
    width: "auto",
    flexDirection: "column",
    justifyContent: "space-evenly"
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
  createAccountLink: {
      marginTop: ".5em",
      color: "#0061ff"
  },
  navLink: {
    textDecoration: "none",
    cursor: "pointer",
    color: "black"
  },
  signInButton: {
    textTransform: "none",
    width: "6em",
    backgroundColor: "#0070e0",
    backgroundImage: "linear-gradient(#168add, #007ee5)",
    border: "1px solid #0c6ebe",
    color: "white" ,
    fontSize: "1em",
    marginLeft: ".5em",
    fontWeight: "700"
  },
  demoButton: {
    textTransform: "none",
    width: "6em",
    fontSize: "1em",
    fontWeight: "700"
  },
  buttonContainer: {
      display: "flex",
      justifyContent: "flex-end"
  },
  textfield: {
      width: "100%",
  },
  formControl: {
      display: "flex",
      flexDirection: "column",
      height: "14em",
      justifyContent: "space-evenly"
  },
  errorFont: {
    color: "red"
  },
}));

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const token = useSelector((state) => state.authentication.token);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const response = await dispatch(login(email, password));
    if (response) {
        setErrors(response.error.errors);
    }
  };

  const handleDemoSubmit = (e) => {
      dispatch(login("demo@example.com", "password"))
  }

  const updateProperty = (callback) => (e) => {
    callback(e.target.value);
  };

  const classes = useStyles();

  if (token) {
    return <Redirect to='/' />;
  }

  return (
    <Box className={classes.splashContainer}>
      <Box className={classes.bodyContainer}>
      {errors ?
            <ul className={classes.errorFont}>
                {errors.map(error => {
                    return (
                        <li>{error}</li>
                    )
                })}
            </ul>
            :
            null
          }
        <Box className={classes.formHeader}>
          <Typography variant="h5">Sign In</Typography>
          <NavLink to={"/splash/signup"} color="#0061ff" className={classes.navLink}>
            <Typography variant="subtitle2" className={classes.createAccountLink}>or create an account</Typography>
          </NavLink>
        </Box>
        <Box>
          <Box className={classes.formContainer}>
            <form className={classes.formControl}>
              <TextField
                type='text'
                placeholder='Email'
                value={email}
                required
                size="small"
                onChange={updateProperty(setEmail)}
                variant="outlined"
                color="secondary"
                className={classes.textfield}
              />
              <TextField
                type='password'
                placeholder='Password'
                value={password}
                required
                size="small"
                onChange={updateProperty(setPassword)}
                variant="outlined"
                color="secondary"
                className={classes.textfield}
              />
              <Box className={classes.buttonContainer}>
                <Button onClick={handleDemoSubmit} disableElevation className={classes.demoButton} variant="contained">Demo</Button>
                <Button onClick={handleSubmit} disableElevation className={classes.signInButton}>Sign in</Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
