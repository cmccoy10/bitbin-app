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
import { createFolder, restoreFolder } from '../../../../store/ducks/folders';
import { useEffect } from 'react';
import { restoreFile } from '../../../../store/ducks/files';


const useStyles = makeStyles((theme) => ({
    createButton: {
      background: "#0070e0",
      color: "white"
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

const RestoreModal = (props) => {
    const dispatch = useDispatch();
    let folder = props.clickedFolder;
    let file = props.clickedFile;

    const handleRestore = () => {
        if (folder) {
            dispatch(restoreFolder({ "childId": folder.id, "previousParentId": folder.previousParentId }));
        } else {
            dispatch(restoreFile({ "id": file.id, "previousFolderId": file.previousFolderId }));
        }
        props.onClose();
    }

    const classes = useStyles();
    return (
        <div>
            <Dialog
                fullWidth={true}
                open={props.restoreOpen}
                onClose={props.restoreItemClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    <Box className={classes.dialogTitleContainer}>
                        {folder ?
                        <FontAwesomeIcon icon={faFolder} size="2x" color="#91ceff"/>
                        :
                        <FontAwesomeIcon icon={faFileAlt} size="2x" />
                        }
                        <Typography variant="h6" className={classes.dialogTitle}>{`Restore ${folder ? folder.name : file.fileName}`}</Typography>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Typography>{`Are you sure you want to restore this ${folder ? "folder" : "file"}?`}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button color="other" variant="contained" disableElevation onClick={props.onClose}>Cancel</Button>
                    <Button className={classes.createButton} variant="contained" disableElevation onClick={handleRestore} >Restore</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default RestoreModal;
