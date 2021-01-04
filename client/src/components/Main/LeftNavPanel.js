import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive, faBoxOpen } from '@fortawesome/free-solid-svg-icons'
import { Box } from '@material-ui/core';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentFolder } from '../../store/ducks/currentFolder';
import "./LeftNavPanel.css"
import { GitHub, LinkedIn } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    navContainer: {
        display: "flex",
        flexDirection: "column",
        alignContent: "flex-start",
        alignItems: "flex-start",
        paddingLeft: "3em",
        height: "100%",
        justifyContent: "space-between"
    },
    navLink: {
        textDecoration: "none",
        fontSize: "1.5em",
        fontWeight: "400",
    },
    homeLink: {
        color: "#000"
    },
    listColor: {
        color: "#666"
    },
    logoContainer: {
        paddingTop: "3em",
        paddingBottom: "3em",
    },
    homeContainer: {
        paddingBottom: "3em",
    },
    filesHeader: {
        paddingBottom: "1em",
    },
    fileOptions: {

    },
    socialContainer: {
        paddingBottom: ".5em"
    },
    socialLinks: {
        textDecoration: "none",
        color: "#0d2481",
        paddingRight: ".3em",
    },
}));


const LeftNavPanel = () => {
    const user = useSelector(state => state.users);
    const dispatch = useDispatch();

    const handleHome = () => {
        dispatch(setCurrentFolder(null))
    }

    const classes = useStyles();
    return (
        <Box className={classes.navContainer}>
            <Box>
                <Box className={classes.logoContainer}>
                    <NavLink to={"/home"} onClick={handleHome}>
                        <FontAwesomeIcon icon={faBoxOpen} size="2x" color="#0d2481"/>
                    </NavLink>
                </Box>
                <Box>
                    <Box className={classes.filesHeader}>
                        <NavLink to={"/home"} className="navLink" onClick={handleHome} activeStyle={{color: "#000"}}>
                            Home
                        </NavLink>
                    </Box>
                    <Box className={classes.filesHeader}>
                        <NavLink to={`/folders/${user.personalFolderId}`} className="navLink" activeStyle={{color: "#000"}}>
                            All files
                        </NavLink>
                    </Box>
                    <Box className={classes.filesHeader}>
                        <NavLink to={`/folders/${user.trashBinId}`} className="navLink" activeStyle={{color: "#000"}}>
                            Deleted files
                        </NavLink>
                    </Box>
                </Box>
            </Box>
            <Box className={classes.socialContainer}>
                <a href="https://github.com/cmccoy10" className={classes.socialLinks} >
                    <GitHub className={classes.small}/>
                </a>
                <a href="https://www.linkedin.com/in/cole-mccoy-20665096/" className={classes.socialLinks} >
                    <LinkedIn className={classes.small}/>
                </a>
            </Box>
        </Box>
    );
};

export default LeftNavPanel;
