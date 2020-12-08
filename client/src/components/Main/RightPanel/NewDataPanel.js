import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Avatar, Typography, Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload, faFolderPlus } from '@fortawesome/free-solid-svg-icons'


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
}));

const NewDataPanel = () => {
    const classes = useStyles();

    return (
        <Box>
            <Button className={classes.buttonStyle}>
                <Box className={classes.newOption}>
                    <FontAwesomeIcon icon={faFileUpload} size="lg" color="#0d2481"/>
                    <Typography className={classes.fontPadding}> Upload file</Typography>
                </Box>
            </Button>
            <Button className={classes.buttonStyle}>
                <Box className={classes.newOption}>
                    <FontAwesomeIcon icon={faFolderPlus} size="lg" color="#0d2481"/>
                    <Typography className={classes.fontPadding}> New folder</Typography>
                </Box>
            </Button>
        </Box>
    );
};

export default NewDataPanel;
