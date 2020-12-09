import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive } from '@fortawesome/free-solid-svg-icons'
import { Box } from '@material-ui/core';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentFolder } from '../../store/ducks/currentFolder';


const useStyles = makeStyles((theme) => ({
    navContainer: {
        display: "flex",
        flexDirection: "column",
        alignContent: "flex-start",
        alignItems: "flex-start",
        paddingLeft: "3em"
    },
    navLink: {
        textDecoration: "none"
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

    }
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
            <Box className={classes.logoContainer}>
                <FontAwesomeIcon icon={faArchive} size="2x" color="#0d2481"/>
            </Box>
            <Box className={classes.homeContainer}>
                <NavLink to={"/"} color="#000" className={classes.navLink} onClick={handleHome}>
                    <Typography variant="h6" className={classes.homeLink}>Home</Typography>
                </NavLink>
            </Box>
            <Box className={classes.filesHeader}>
                <Typography variant="subtitle2" className={classes.listColor}>Files</Typography>
            </Box>
            <Box>
                <Box className={classes.filesHeader}>
                    <NavLink to={`/folders/${user.personalFolderId}`} className={classes.navLink}>
                        <Typography className={classes.listColor}>All files</Typography>
                    </NavLink>
                </Box>
                <Box className={classes.filesHeader}>
                    <NavLink to={`/folders/${user.trashBinId}`} className={classes.navLink}>
                        <Typography className={classes.listColor}>Deleted files</Typography>
                    </NavLink>
                </Box>
            </Box>
        </Box>
    );
};

export default LeftNavPanel;
