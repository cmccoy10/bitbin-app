import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Button, Box, Grid, Typography, TextField } from "@material-ui/core";
import { FormControl } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { signUp } from '../../store/ducks/authentication';
import { NavLink } from 'react-router-dom';


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
    height: "30em",
    width: "auto",
    flexDirection: "column",
    justifyContent: "space-evenly"
  },
  createAccountLink: {
    marginTop: ".5em",
    color: "#0061ff"
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    width: "25em",
    justifyContent: "center"
  },
  formHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center"
  },
  formControl: {
    display: "flex",
    flexDirection: "column",
    height: "24em",
    justifyContent: "space-evenly"
  },
  navLink: {
    textDecoration: "none",
    cursor: "pointer",
    color: "black"
  },
  signUpButton: {
    textTransform: "none",
    width: "100%",
    backgroundColor: "#0070e0",
    backgroundImage: "linear-gradient(#168add, #007ee5)",
    border: "1px solid #0c6ebe",
    color: "white" ,
    fontSize: "1em",
    fontWeight: "700"
  },
  textfield: {
    width: "100%",
  },
  errorFont: {
    color: "red"
  },
}));

const SignUpForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  const updateProperty = (callback) => (e) => {
    callback(e.target.value);
  };

  const handleSubmit = async (e) => {
    const newUser = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    };
    const response = await dispatch(signUp(newUser));
    if (response) {
        setErrors(response.error.errors);
    }
  };

  const classes = useStyles();
  return (
    <Box className={classes.splashContainer}>
      <Box className={classes.bodyContainer} direction="column"
      alignContent="space-between">
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
            <Typography variant="h6">Create an account</Typography>
            <NavLink to={"/splash/login"} color="#0061ff" className={classes.navLink}>
                <Typography variant="subtitle2" className={classes.createAccountLink}>or log in</Typography>
            </NavLink>
        </Box>
        <Box>
          <Box className={classes.formContainer}>
            <form className={classes.formControl}>
              <TextField
                type='text'
                placeholder='First Name'
                value={firstName}
                onChange={updateProperty(setFirstName)}
                required
                variant="outlined"
                size="small"
                color="secondary"
                className={classes.textfield}
              />
              <TextField
                type='text'
                placeholder='Last Name'
                value={lastName}
                onChange={updateProperty(setLastName)}
                required
                variant="outlined"
                size="small"
                color="secondary"
                className={classes.textfield}
              />
              <TextField
                type='email'
                placeholder='Email'
                value={email}
                onChange={updateProperty(setEmail)}
                required
                variant="outlined"
                size="small"
                color="secondary"
                className={classes.textfield}
              />
              <TextField
                type='password'
                placeholder='Password'
                value={password}
                onChange={updateProperty(setPassword)}
                required
                variant="outlined"
                size="small"
                color="secondary"
                className={classes.textfield}
              />
              <TextField
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={updateProperty(setConfirmPassword)}
                required
                variant="outlined"
                size="small"
                color="secondary"
                className={classes.textfield}
              />
              </form>
            <Button color="secondary" className={classes.signUpButton} onClick={handleSubmit}>Create an account</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpForm;
