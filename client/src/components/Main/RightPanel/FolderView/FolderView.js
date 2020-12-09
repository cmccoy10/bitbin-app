import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, List, Typography, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    folderContainer: {
        paddingLeft: "3em",
        paddingRight: "3em",
        width: "100%",
        height: "100%",
    },
    folderHeader: {
        width: "100%",
        paddingBottom: ".5em",
        borderBottom: "1px solid #e6e8eb"
    },
    navLink: {
        textDecoration: "none",
        color: "black"
    },
    folderListContainer: {
        display: "flex",
        flexDirection: "column",
        width: "100%"
    },
    folderListItem: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingTop: ".5em",
        paddingBottom: ".5em",
        paddingLeft: ".5em"
    },
    listHeader: {
        paddingTop: "3em",
        paddingBottom: ".5em"
    },
    icon: {
        paddingRight: ".5em"
    },
}));


const FolderView = () => {
    const folders = useSelector(state => state.folders);
    const files = useSelector(state => state.files);
    const classes = useStyles()
    return (
        <Box className={classes.folderContainer}>
            <Box className={classes.folderHeader}>
                <Typography variant="h6">Overview</Typography>
            </Box>
            <Box className={classes.listHeader}>
                <Box>
                    <Typography>Name</Typography>
                </Box>
            </Box>
            <Divider />
            <Box className={classes.folderListContainer}>
                {Object.values(folders).map(folder => {
                    return (
                    <Box >
                        <Link to={`/folders/${folder.id}`} className={classes.navLink}>
                            <Box className={classes.folderListItem}>
                                <Box className={classes.icon}>
                                    <FontAwesomeIcon icon={faFolder} size="2x" color="#91ceff"/>
                                </Box>
                                <Box>
                                    <Typography>{folder.name}</Typography>
                                </Box>
                            </Box>
                        </Link>
                        <Divider />
                    </Box>
                    )
                })}
                {Object.values(files).map(file => {
                    return (
                    <Box >
                        <a href={file.itemUrl} className={classes.navLink}>
                            <Box className={classes.folderListItem}>
                                <Box className={classes.icon}>
                                    <FontAwesomeIcon icon={faFileAlt} size="2x"/>
                                </Box>
                                <Box>
                                    <Typography>{file.fileName}</Typography>
                                </Box>
                            </Box>
                            <Divider />
                        </a>
                    </Box>
                    )
                })}
            </Box>
        </Box>
    );
};

export default FolderView;
