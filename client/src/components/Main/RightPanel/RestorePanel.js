import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Avatar, Typography, Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import NewFolder from './modals/NewFolder';
import { useState } from 'react';
import RestoreModal from './modals/RestoreModal';
import PermDelete from './modals/PermDelete';


const useStyles = makeStyles((theme) => ({
    newOption: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    fontPadding: {
        paddingLeft: ".5em",
    },
    buttonStyle: {
        textTransform: "none",
        background: "#0070e0",
        color: "white",
        width: "14em",
    },
    permDeleteContainer: {
        cursor: "pointer",
        paddingTop: ".5em"
    },
    permDeleteText: {
        paddingLeft: ".5em",
        color: "#0070e0",
    }
}));

const RestorePanel = ({ clickedFolder, clickedFile }) => {
    const [restoreOpen, setRestoreOpen] = useState(false);
    const [permOpen, setPermOpen] = useState(false);

    const restoreItemClick = () => {
        setRestoreOpen(true);
    };

    const restoreItemClose = () => {
        setRestoreOpen(false);
    };

    const permItemClick = () => {
        setPermOpen(true);
    };

    const permItemClose = () => {
        setPermOpen(false);
    };

    const classes = useStyles();

    return (
        <Box>
            {clickedFolder || clickedFile ?
            <Box>
                <Button className={classes.buttonStyle} onClick={restoreItemClick}>
                    <Typography className={classes.fontPadding}>Restore</Typography>
                </Button>
                <Box className={classes.permDeleteContainer} disabled={!clickedFolder && !clickedFile}>
                    <Box className={classes.newOption}>
                        <FontAwesomeIcon icon={faTrashAlt} size="lg" color="#0070e0"/>
                        <Typography className={classes.permDeleteText} onClick={permItemClick}> Permanently delete</Typography>
                    </Box>
                </Box>
            </Box>
            :
            null
            }
            {clickedFolder || clickedFile ?
            <>
                <RestoreModal restoreOpen={restoreOpen} onClose={restoreItemClose}
                clickedFile={clickedFile} clickedFolder={clickedFolder}/>
                <PermDelete permOpen={permOpen} onClose={permItemClose}
                clickedFile={clickedFile} clickedFolder={clickedFolder}/>
            </>
            :
            null
            }
        </Box>
    );
};

export default RestorePanel;
