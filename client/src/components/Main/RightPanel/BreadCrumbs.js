import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive } from '@fortawesome/free-solid-svg-icons'
import { Box, Avatar, Typography } from '@material-ui/core';
import { Link, NavLink } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    headerContainer: {
        display: "flex",
        flexDirection: "row",
        padding: "",
        justifyContent: "space-between",
    },
    small: {
        width: theme.spacing(3.5),
        height: theme.spacing(3.5),
    },
}));


const BreadCrumbs = () => {

    const classes = useStyles();
    return (
        <Box className={classes.headerContainer}>
            <Box>
                <Typography variant="h5">Home</Typography>
            </Box>
            <Box>
                <Avatar
                    variant="circle"
                    className={classes.small}
                    alt="user icon"
                    // src={imgUrl}
                    // ref={anchorRef}
                    aria-haspopup="true"
                />
            </Box>
        </Box>
    );
};

export default BreadCrumbs;
