import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Avatar, Typography, Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload, faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import NewFolder from './modals/NewFolder';
import { useState } from 'react';
import UploadFile from './modals/UploadFile';
import Dropzone from './FolderView/Dropzone';


const useStyles = makeStyles((theme) => ({
    newOption: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    fontPadding: {
        paddingLeft: ".5em"
    },
    buttonStyle: {
        textTransform: "none",
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "column",
        width: "10em",
        marginTop: "1em",
    },
}));

const NewDataPanel = () => {
    const [open, setOpen] = useState(false);
    const [uploadOpen, setUploadOpen] = useState(false);

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
                <Button className={classes.buttonStyle} onClick={uploadFileClick}>
                    <Box className={classes.newOption}>
                        <FontAwesomeIcon icon={faFileUpload} size="lg" color="#0d2481"/>
                        <Typography className={classes.fontPadding}> Upload file</Typography>
                    </Box>
                </Button>
                <Button className={classes.buttonStyle} onClick={newFolderClick}>
                    <Box className={classes.newOption}>
                        <FontAwesomeIcon icon={faFolderPlus} size="lg" color="#0d2481"/>
                        <Typography className={classes.fontPadding}> New folder</Typography>
                    </Box>
                </Button>
            </Box>
            <NewFolder open={open} onClose={newFolderClose}/>
            <UploadFile open={uploadOpen} onClose={uploadFileClose}/>
        </Box>
    );
};

export default NewDataPanel;
