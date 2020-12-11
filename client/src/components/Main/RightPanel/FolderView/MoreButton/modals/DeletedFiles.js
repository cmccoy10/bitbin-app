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
import { moveFolderToDeleted } from '../../../../../../store/ducks/folders';
import { moveFileToDeleted } from '../../../../../../store/ducks/files';



const useStyles = makeStyles((theme) => ({
    deleteButton: {
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

const DeletedFiles = (props) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        if (props.folder) {
            dispatch(moveFolderToDeleted({ "childId": props.folder.id }))
        } else if (props.file) {
            dispatch(moveFileToDeleted({ "id": props.file.id, "folderId": props.file.folderId }));
        }
        props.onClose();
    }

    const classes = useStyles();
    return (
        <div>
            <Dialog
                fullWidth={true}
                open={props.deleteOpen}
                onClose={props.newFolderClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    <Box className={classes.dialogTitleContainer}>
                        {props.folder ?
                        <FontAwesomeIcon icon={faFolder} size="2x" color="#91ceff"/>
                        :
                        <FontAwesomeIcon icon={faFileAlt} size="2x" />
                        }
                        <Typography variant="h6" className={classes.dialogTitle}>Delete {props.folder ? "folder" : "file"}?</Typography>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Box>
                        <Typography>Are you sure you want to delete this {props.folder ? "folder" : "file"}?</Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="other" variant="contained" disableElevation onClick={props.onClose}>Cancel</Button>
                    <Button className={classes.deleteButton} variant="contained" disableElevation onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeletedFiles;
