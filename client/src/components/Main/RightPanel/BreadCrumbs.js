import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive } from '@fortawesome/free-solid-svg-icons'
import { Box, Avatar, Typography } from '@material-ui/core';
import { Link, NavLink, useParams } from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useSelector } from 'react-redux';


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
    navLink: {
        textDecoration: "none",
        color: "black"
    }
}));


const BreadCrumbs = ({ currentFolder }) => {
    const breadcrumbs = useSelector(state => state.breadcrumbs);
    console.log("BREADCRUMBS\n\n", breadcrumbs)

    const classes = useStyles();
    return (
        <Box className={classes.headerContainer}>
            {currentFolder ?
            <Box>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    {breadcrumbs.map(folder => {
                        return (
                        <Link to={`/folders/${folder.id}`} className={classes.navLink} key={folder.id}>
                            <Typography variant="h5">{folder.name}</Typography>
                        </Link>
                        )
                    })}
                </Breadcrumbs>
            </Box>
            :
            <Box>
                <Typography variant="h5">Home</Typography>
            </Box>
            }
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
