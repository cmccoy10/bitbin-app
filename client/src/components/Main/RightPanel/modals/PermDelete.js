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
import { permDeleteFile } from '../../../../store/ducks/files';
import { permDeleteFolder } from '../../../../store/ducks/folders';


const useStyles = makeStyles((theme) => ({
    permButton: {
        background: "#0070e0",
        color: "white",
        textTransform: "none",
    },
    buttonStyle: {
        textTransform: "none",
    },
    dialogTitleContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    dialogTitle: {
        paddingLeft: "1em"
    },
}));

const PermDelete = (props) => {
    const dispatch = useDispatch();
    let folder = props.clickedFolder;
    let file = props.clickedFile;

    const handlePermDelete = () => {
        if (folder) {
            dispatch(permDeleteFolder({ "id": folder.id }));
        } else {
            dispatch(permDeleteFile ({ "id": file.id, "key": file.key }));
        }
        props.onClose();
    }

    const classes = useStyles();
    return (
        <div>
            <Dialog
                fullWidth={true}
                open={props.permOpen}
                onClose={props.permItemClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    <Box className={classes.dialogTitleContainer}>
                        {folder ?
                        <FontAwesomeIcon icon={faFolder} size="2x" color="#91ceff"/>
                        :
                        <FontAwesomeIcon icon={faFileAlt} size="2x" />
                        }
                        <Typography variant="h6" className={classes.dialogTitle}>{`Permanently delete ${folder ? folder.name : file.fileName}`}</Typography>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Typography>{`This ${folder ? "folder" : "file"} will be gone forever and you won’t be able to restore it.`}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button className={classes.buttonStyle} color="other" variant="contained" disableElevation onClick={props.onClose}>Cancel</Button>
                    <Button className={classes.permButton} variant="contained" disableElevation onClick={handlePermDelete}>Permanently delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PermDelete;
