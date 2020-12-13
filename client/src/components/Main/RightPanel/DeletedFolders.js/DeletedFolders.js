import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, List, Typography, TextField, Divider, IconButton } from '@material-ui/core';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux';
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
        paddingLeft: ".5em",
        justifyContent: "space-between",
        cursor: "pointer",
        "&:hover": {
            background: "#e5e5e5",
        },
    },
    highlightedListItem: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingTop: ".5em",
        paddingBottom: ".5em",
        paddingLeft: ".5em",
        justifyContent: "space-between",
        cursor: "pointer",
        "&:hover": {
            background: "#e5e5e5",
        },
        background: "#e5e5e5"
    },
    listHeader: {
        paddingTop: "3em",
        paddingBottom: ".5em"
    },
    icon: {
        paddingRight: ".5em"
    },
    nameAndIcon: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    ellipsisContainer: {
        paddingRight: ".5em",
    },
}));


const DeletedFolders = ({ isDeleted, setClickedFolder, setClickedFile, clickedFile, clickedFolder }) => {
    const folders = useSelector(state => state.folders);
    const files = useSelector(state => state.files);
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleClick = (key, value) => {
        if (key === "file") {
            setClickedFolder(null);
            setClickedFile(value);
        } else if (key === "folder") {
            setClickedFile(null);
            setClickedFolder(value);
        }
    }

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
                {Object.values(files).map(file => {
                    return (
                    <Box key={file.id}>
                        {clickedFile === file ?
                        <Box className={classes.highlightedListItem}
                        onClick={() => handleClick("file", file)}
                        >
                            <Box className={classes.nameAndIcon}>
                                <Box className={classes.icon}>
                                    <FontAwesomeIcon icon={faFileAlt} size="2x"/>
                                </Box>
                                <Box>
                                    <Typography>{file.fileName}</Typography>
                                </Box>
                            </Box>
                        </Box>
                        :
                        <Box className={classes.folderListItem}
                        onClick={() => handleClick("file", file)}
                        >
                            <Box className={classes.nameAndIcon}>
                                <Box className={classes.icon}>
                                    <FontAwesomeIcon icon={faFileAlt} size="2x"/>
                                </Box>
                                <Box>
                                    <Typography>{file.fileName}</Typography>
                                </Box>
                            </Box>
                        </Box>
                        }
                        <Divider />
                    </Box>
                    )
                })}
                {Object.values(folders).map(folder => {
                    return (
                    <Box key={folder.id}>
                        {clickedFolder === folder ?
                        <Box className={classes.highlightedListItem}
                        onClick={() => handleClick("folder", folder)}
                        >
                            <Box className={classes.nameAndIcon}>
                                <Box className={classes.icon}>
                                    <FontAwesomeIcon icon={faFolder} size="2x" color="#91ceff"/>
                                </Box>
                                <Box>
                                    <Typography>{folder.name}</Typography>
                                </Box>
                            </Box>
                        </Box>
                        :
                        <Box className={classes.folderListItem}
                        onClick={() => handleClick("folder", folder)}
                        >
                            <Box className={classes.nameAndIcon}>
                                <Box className={classes.icon}>
                                    <FontAwesomeIcon icon={faFolder} size="2x" color="#91ceff"/>
                                </Box>
                                <Box>
                                    <Typography>{folder.name}</Typography>
                                </Box>
                            </Box>
                        </Box>
                        }

                        <Divider />
                    </Box>
                    )
                })}
            </Box>
        </Box>
    );
};

export default DeletedFolders;
