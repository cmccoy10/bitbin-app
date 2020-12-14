import React, { useState, useEffect, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Switch } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import { CssBaseline } from "@material-ui/core";
import Theme from './components/Theme/Theme';
import { ProtectedRoute, PrivateRoute } from './util.js/route-util';
import Main from './components/Main/Main';
import LoginForm from './components/Login/LoginForm';
import SignUpForm from './components/Login/SignUpForm';
import { loadToken } from './store/ducks/authentication';
import { getUser } from './store/ducks/users';
import Splash from './components/Login/Splash';

const App = ({ needLogin, loadToken }) => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoaded(true);
    loadToken();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
  <BrowserRouter>
    <CssBaseline />
    <Theme>
      <Switch>
      <Route
        exact
        path="/"
        render={() => {
            return (
                needLogin === true ?
                <Redirect to="/splash" /> :
                <Redirect to="/home" />
            )
        }}
        />
        <Route path='/splash' needLogin={needLogin} component={Splash} />
        <PrivateRoute path="/" needLogin={needLogin} component={Main} />
        <Redirect to="/home" needLogin={needLogin} component={Main}/>
      </Switch>
    </Theme>
  </BrowserRouter>
)};

const AppContainer = () => {
  const needLogin = useSelector((state) => !state.authentication.token);
  const dispatch = useDispatch();
  return <App needLogin={needLogin} loadToken={() => dispatch(loadToken())} />;
};

export default AppContainer;
