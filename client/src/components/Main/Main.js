import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import LeftNavPanel from './LeftNavPanel';
import RightPanel from './RightPanel/RightPanel';
import { useEffect } from 'react';
import "./Main.css"
import { setCurrentFolder } from '../../store/ducks/currentFolder';
import { getFiles, getFolders } from '../../store/ducks/folders';
import { Route, useParams } from 'react-router-dom';


const Main = () => {

    return (
        <div className="mainContainer">
            <div className="leftNavPanel">
                <LeftNavPanel/>
            </div>
            <Route path="/folders/:id">
                <div className="rightPanel">
                    <RightPanel/>
                </div>
            </Route>
        </div>
    );
}

export default Main;
