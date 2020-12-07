import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive } from '@fortawesome/free-solid-svg-icons'
import { Box, Avatar, Typography } from '@material-ui/core';
import { Link, NavLink } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    folderContainer: {
        // paddingLeft: "3em",
        // paddingRight: "3em",
        // border: "thin solid black"
    },
}));

const FolderView = () => {

    const classes = useStyles()
    return (
        <Box className={classes.folderContainer}>

        </Box>
    );
};

export default FolderView;
