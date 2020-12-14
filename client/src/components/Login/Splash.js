import { Typography } from '@material-ui/core';
import React from 'react';
import "./Splash.css";
import { faArchive } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { useSelector } from 'react-redux';
import { ProtectedRoute } from '../../util.js/route-util';



const Splash = () => {
    const needLogin = useSelector((state) => !state.authentication.token);
    return (
        <div className="splashPageContainer">
            <div className="splashBanner">
                <div className="splashBannerLogo">
                    <div className="splashBannerIcon">
                        <FontAwesomeIcon icon={faArchive} size="3x" color="#0062ff"/>
                    </div>
                    <p className="splashBannerFont">Bitbin</p>
                </div>
            </div>
            <div className="splashContentContainer">
                <div className="backgroundImage">
                </div>
                <ProtectedRoute path='/splash/login' exact={true} needLogin={needLogin} component={LoginForm} />
                <ProtectedRoute path='/splash/signup' exact={true} needLogin={needLogin} component={SignUpForm} />
            </div>
        </div>
    );
};

export default Splash;
