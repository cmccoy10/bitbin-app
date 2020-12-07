import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import LeftNavPanel from './LeftNavPanel';
import RightPanel from './RightPanel/RightPanel';
import "./Main.css"


// const useStyles = makeStyles((theme) => ({
//     leftNavPanel: {
//         border: "thin solid black"
//     },
//     rightNavPanel: {
//         border: "thin solid black"
//     },
// }));

const Main = () => {
    // const dispatch = useDispatch();

    // const classes = useStyles();
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
