import { Typography } from '@material-ui/core';
import React from 'react';
import "./Splash.css";
import { faArchive } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LoginForm from './LoginForm';


const Splash = () => {
    return (
        <div className="splashPageContainer">
            <div className="splashBanner">
                <div className="splashBannerLogo">
                    <div className="splashBannerIcon">
                        <FontAwesomeIcon icon={faArchive} size="3x" color="#0062ff"/>
                    </div>
                    <Typography variant="h4">Bitbin</Typography>
                </div>
            </div>
            <div className="splashContentContainer">
                <LoginForm />
            </div>
        </div>
    );
};

export default Splash;
