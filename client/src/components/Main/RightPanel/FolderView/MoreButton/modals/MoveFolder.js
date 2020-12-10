import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { TextField } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { Box } from '@material-ui/core';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { apiUrl } from '../../../../../../config/config';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';



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
        cursor: "",
        "&:hover": {
            background: "#e5e5e5",
        },
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
}));

const MoveFolder = (props) => {
    const dispatch = useDispatch();
    const initialId = props.folder ? props.folder.parentId : props.file.folderId
    const [currentFolder, setCurrentFolder] = useState(initialId);
    const [breadcrumbs, setBreadcrumbs] = useState();
    const [folders, setFolders] = useState();
    const [destination, setDestination] = useState();

    const handleCancel = () => {
        setCurrentFolder(initialId);
        props.onClose();
    }

    // const handleSubmit = () => {

    // }

    // useEffect(() => {
    //     setDestination(initialId)
    // },[]);

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
    }, [currentFolder]);

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
                        <FontAwesomeIcon icon={faFolder} size="2x" color="#91ceff"/>
                        <Typography variant="h6" className={classes.dialogTitle}>{`Move ${props.folder ? props.folder.name : props.file.fileName} to...`}</Typography>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Box>
                        <Breadcrumbs separator="›" aria-label="breadcrumb">
                            {breadcrumbs.map(folder => {
                                return (
                                <Box onClick={() => setCurrentFolder(folder.id)} key={folder.id}>
                                    <Typography variant="subtitle2">{folder.name}</Typography>
                                </Box>
                                )
                            })}
                        </Breadcrumbs>
                    </Box>
                    <Box className={classes.folderListContainer}>
                        {Object.values(folders).map(folder => {
                            return (
                            <Box key={folder.id}>
                                <Box className={classes.folderListItem}>
                                    <Box className={classes.nameAndIcon}>
                                        <Box className={classes.icon}>
                                            <FontAwesomeIcon icon={faFolder} size="2x" color="#91ceff"/>
                                        </Box>
                                        <Box>
                                            <Typography>{folder.name}</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            )
                        })}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="other" variant="contained" disableElevation onClick={handleCancel}>Cancel</Button>
                    <Button className={classes.moveButton} variant="contained" disableElevation disabled={destination == initialId}>Move</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default MoveFolder;
