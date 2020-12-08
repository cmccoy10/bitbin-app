import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive } from '@fortawesome/free-solid-svg-icons'
import { Box, Avatar, Typography } from '@material-ui/core';
import { Link, NavLink, useParams } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    headerContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        paddingLeft: "3em",
        paddingRight: "3em",
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
                    variant="circular"
                    className={classes.small}
                    alt="user icon"
                    aria-haspopup="true"
                />
            </Box>
        </Box>
    );
};

export default BreadCrumbs;
