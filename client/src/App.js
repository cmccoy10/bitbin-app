import React, { useState, useEffect, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from "@material-ui/core";
import Theme from './components/Theme/Theme';
import { ProtectedRoute, PrivateRoute } from './util.js/route-util';
import Main from './components/Main/Main';
import LoginForm from './components/Login/LoginForm';
import SignUpForm from './components/Login/SignUpForm';
import { loadToken } from './store/ducks/authentication';

const App = ({ needLogin, loadToken }) => {
  const [loaded, setLoaded] = useState(false);

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
        <ProtectedRoute path='/login' exact={true} needLogin={needLogin} component={LoginForm} />
        <ProtectedRoute path='/signup' exact={true} needLogin={needLogin} component={SignUpForm} />
        <PrivateRoute path="/" needLogin={needLogin} component={Main} />
        <Redirect to="/" needLogin={needLogin} component={Main}/>
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
