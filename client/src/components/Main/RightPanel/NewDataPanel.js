import { makeStyles } from '@material-ui/core/styles';
import { Box, Avatar, Typography, Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload, faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import NewFolder from './modals/NewFolder';
import { useState } from 'react';
import UploadFile from './modals/UploadFile';
import Dropzone from './FolderView/Dropzone';
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { useDispatch } from 'react-redux';
import { uploadFile } from '../../../store/ducks/files';


const useStyles = makeStyles((theme) => ({
    newOption: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    fontPadding: {
        paddingLeft: ".5em"
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "column",
        width: "10em",
        marginTop: "1em",
    },
    buttonStyle: {
        width: "fit-content",
        cursor: "pointer",
        border: "0",
        marginBottom: ".5em"
    },
    inputReset: {
        borderWidth: "0px",
        border: "none",
    }
}));

const NewDataPanel = () => {
    const [open, setOpen] = useState(false);
    const [uploadOpen, setUploadOpen] = useState(false);
    const dispatch = useDispatch();

    const onDrop = useCallback(acceptedFiles => {
        const data = new FormData();
        const file = acceptedFiles[0];
        data.append("file", file);
        dispatch(uploadFile(data));
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const newFolderClick = () => {
        setOpen(true);
    };

    const newFolderClose = () => {
        setOpen(false);
    };

    const uploadFileClick = () => {
        setUploadOpen(true);
    }

    const uploadFileClose = () => {
        setUploadOpen(false);
    }

    const classes = useStyles();

    return (
        <Box>
            <Dropzone />
            <Box className={classes.buttonContainer}>
                <div {...getRootProps()} className={classes.buttonStyle}>
                    <input className={classes.inputReset} {...getInputProps()}/>
                    <Box className={classes.newOption}>
                        <FontAwesomeIcon icon={faFileUpload} size="lg" color="#0d2481"/>
                        <Typography className={classes.fontPadding}> Upload file</Typography>
                    </Box>
                </div>
                <Box className={classes.buttonStyle} onClick={newFolderClick}>
                    <Box className={classes.newOption}>
                        <FontAwesomeIcon icon={faFolderPlus} size="lg" color="#0d2481"/>
                        <Typography className={classes.fontPadding}> New folder</Typography>
                    </Box>
                </Box>
            </Box>
            <NewFolder open={open} onClose={newFolderClose}/>
            {/* <UploadFile open={uploadOpen} onClose={uploadFileClose}/> */}
        </Box>
    );
};

export default NewDataPanel;
