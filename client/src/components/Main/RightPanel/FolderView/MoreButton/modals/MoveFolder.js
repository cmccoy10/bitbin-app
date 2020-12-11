import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { Box } from '@material-ui/core';
import { useEffect } from 'react';
import { apiUrl } from '../../../../../../config';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { moveFolderLocation } from '../../../../../../store/ducks/folders';
import { moveFileLocation } from '../../../../../../store/ducks/files';



const useStyles = makeStyles((theme) => ({
    dialogTitleContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    dialogTitle: {
        paddingLeft: "1em"
    },
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
    highlightedFolderListItem: {
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
    breadcrumbContainer: {
        cursor: "pointer",
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
    moveButton: {
        backgroundColor: "#0070e0",
        color: "white"
    },
    activeCrumb: {
        color: "black"
    }
}));

const MoveFolder = (props) => {
    const dispatch = useDispatch();
    const initialId = props.folder ? props.folder.parentId : props.file.folderId;
    const targetFolderId = props.folder ? props.folder.id : props.file.folderId;
    const [currentFolder, setCurrentFolder] = useState(initialId);
    const [breadcrumbs, setBreadcrumbs] = useState();
    const [folders, setFolders] = useState();
    const [destination, setDestination] = useState();
    const [activeId, setActveId] = useState(initialId);

    const handleCancel = () => {
        setCurrentFolder(initialId);
        setDestination(initialId);
        props.onClose();
    }
    const handleSubmit = () => {
        if (props.folder) {
            dispatch(moveFolderLocation({ "childId": targetFolderId, destination }))
        } else if (props.file) {
            dispatch(moveFileLocation({ "id": props.file.id, "folderId": destination }));
        }
        setCurrentFolder(initialId);
        setDestination(initialId);
        props.onClose();
    }

    useEffect(() => {
        // const { authentication: { token } } = getState();
        (async () => {
            const folderResponse = await fetch(`${apiUrl}/folders/${currentFolder}`, {
                headers: {
                    Authorization: `Bearer ${props.token}`
                },
            });
            if (folderResponse.ok) {
                const response = await folderResponse.json();
                setFolders(response)
            }
        })()
    }, [currentFolder])

    useEffect( () => {
        // const { authentication: { token } } = getState();
        (async () => {
            const breadcrumbResponse = await fetch(`${apiUrl}/folders/${currentFolder}/breadcrumbs`, {
                headers: {
                    Authorization: `Bearer ${props.token}`
                },
            });
            if (breadcrumbResponse.ok) {
                const response = await breadcrumbResponse.json();
                setBreadcrumbs(response);
                setDestination(currentFolder);
            }
        })()
    }, []);

    const handleFolderChange = (id) => {
        setDestination(id);
        setCurrentFolder(id);
        setActveId(id);
    };

    const classes = useStyles();

    if (!breadcrumbs || !folders) {
        return null;
    }

    return (
        <div>
            <Dialog
                fullWidth={true}
                open={props.moveOpen}
                onClose={props.moveItemClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    <Box className={classes.dialogTitleContainer}>
                        {props.folder ?
                        <FontAwesomeIcon icon={faFolder} size="2x" color="#91ceff"/>
                        :
                        <FontAwesomeIcon icon={faFileAlt} size="2x" />
                        }

                        <Typography variant="h6" className={classes.dialogTitle}>{`Move ${props.folder ? props.folder.name : props.file.fileName} to...`}</Typography>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Box>
                        <Breadcrumbs separator="›" aria-label="breadcrumb">
                            {breadcrumbs.map(folder => {
                                return (
                                <Box className={classes.breadcrumbContainer} onClick={() => handleFolderChange(folder.id)} key={folder.id}>
                                    {activeId === folder.id ?
                                    <Typography className={classes.activeCrumb} variant="subtitle2">{folder.name}</Typography>
                                    :
                                    <Typography variant="subtitle2">{folder.name}</Typography>
                                    }
                                </Box>
                                )
                            })}
                        </Breadcrumbs>
                    </Box>
                    <Box className={classes.folderListContainer}>
                        {Object.values(folders).map(folder => {
                            return (
                            <Box key={folder.id}>
                                {destination === folder.id && destination !== targetFolderId ?
                                <Box className={classes.highlightedFolderListItem} onClick={() => setDestination(folder.id)}>
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
                                <Box className={classes.folderListItem} onClick={() => setDestination(folder.id)}>
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
                            </Box>
                            )
                        })}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="other" variant="contained" disableElevation onClick={handleCancel}>Cancel</Button>
                    <Button
                    className={classes.moveButton} variant="contained"
                    disableElevation disabled={destination === initialId || destination === targetFolderId}
                    onClick={handleSubmit}
                    >Move</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default MoveFolder;
