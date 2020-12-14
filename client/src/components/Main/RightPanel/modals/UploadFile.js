import { Typography, Form, FormControl, IconButton } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogTitle, Input, InputLabel } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { TextField } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faFileAlt } from '@fortawesome/free-regular-svg-icons'
import { Box } from '@material-ui/core';
import { uploadFile } from '../../../../store/ducks/files';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
    createButton: {
      background: "#0070e0",
      color: "white"
    },
    dialogContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    dialogTitleContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    dialogTitle: {
        paddingLeft: "1em"
    },
    formContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    uploadButton: {
        background: "#0070e0",
        color: "white"
    },
}));

const UploadFile = (props) => {
    const dispatch = useDispatch();

    const [file, setFile] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", file);

        dispatch(uploadFile(data));
        props.onClose();
    }

    const classes = useStyles();
    return (
        <Box >
            <Dialog
                fullWidth={true}
                open={props.open}
                onClose={props.uploadFileClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    <Box className={classes.dialogContainer}>
                        <Box className={classes.dialogTitleContainer}>
                            <FontAwesomeIcon icon={faFileAlt} size="2x" />
                            <Typography variant="h6" className={classes.dialogTitle}>Upload a file</Typography>
                        </Box>
                        <Box>
                            <IconButton onClick={props.onClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit} className={classes.formContainer}>
                        <input
                            type="file"
                            placeholder="Upload file"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <button type="submit" variant="contained" className={classes.uploadButton} disabled={file === ""}>Upload</button>
                    </form>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default UploadFile;
