import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import LeftNavPanel from './LeftNavPanel';
import RightPanel from './RightPanel/RightPanel';
import { useEffect } from 'react';
import "./Main.css"
import { setCurrentFolder } from '../../store/ducks/currentFolder';
import { getFiles, getFolders } from '../../store/ducks/folders';


const Main = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentFolder(1));
        dispatch(getFiles())
        dispatch(getFolders())
    }, []);

    return (
        <div className="mainContainer">
            <div className="leftNavPanel">
                <LeftNavPanel/>
            </div>
            <div className="rightPanel">
                <RightPanel/>
            </div>
        </div>
    );
}

export default Main;
