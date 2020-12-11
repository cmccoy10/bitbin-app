import React from 'react';
import { Popover, Box, List, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import MoveFolder from './modals/MoveFolder';
import { useSelector } from 'react-redux';
import DeletedFiles from './modals/DeletedFiles';


const useStyles = makeStyles((theme) => ({
    popover: {
      height: "10em",
      width: "7em",
      display: "flex",
      flexDirection: "column",
    //   justifyContent: "space-evenly",
      paddingTop: "1em",
      paddingBottom: "1em"
    },
    popoverOption: {
        paddingTop: ".5em",
        paddingBottom: ".5em",
        paddingLeft: "1em",
        paddingRight: "1em",
        cursor: "pointer",
        "&:hover": {
            background: "#e5e5e5",
        },
    },
    ellipsis: {
        border: "none",
        color: "none",
        cursor: "pointer",
    },
}));

const MoreButton = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [moveOpen, setMoveOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const token = useSelector(state => state.authentication);
    const file = props.file;
    const folder = props.folder;

    const moveItemClick = () => {
        setMoveOpen(true);
    };

    const moveItemClose = () => {
        setMoveOpen(false);
    };

    const deleteItemClick = () => {
        setDeleteOpen(true);
    };

    const deleteItemClose = () => {
        setDeleteOpen(false);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        if (file) {
            props.setClickedFile(file.id);
            props.setFileName(file.fileName);
        } else {
            props.setClickedFolder(folder.id);
            props.setFolderName(folder.name);
        }
    }

    const handleMoveOptionClick = () => {
        if (file) {
            props.setClickedFile(file.id);
            moveItemClick();
        } else {
            props.setClickedFolder(folder.id);
            moveItemClick();
        }
    }

    const handleDeleteOptionClick = () => {
        if (file) {
            props.setClickedFile(file.id);
            deleteItemClick();
        } else {
            props.setClickedFolder(folder.id);
            deleteItemClick();
        }
    }

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    const classes = useStyles();

    return (
        <>
            <button className={classes.ellipsis} onClick={handleClick}>
                <MoreHorizIcon/>
            </button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
                }}
                transformOrigin={{
                vertical: "top",
                horizontal: "center",
                }}
            >
                <Box className={classes.popover}>
                    <Box className={classes.popoverOption} onClick={handleEdit}>
                        <Typography>Rename</Typography>
                    </Box>
                    <Box className={classes.popoverOption} onClick={handleMoveOptionClick} >
                        <Typography>Move</Typography>
                    </Box>
                    <Box className={classes.popoverOption} onClick={handleDeleteOptionClick}>
                        <Typography>Delete</Typography>
                    </Box>
                </Box>
            </Popover>
            <MoveFolder token={token} moveOpen={moveOpen} onClose={moveItemClose} folder={folder} file={file}/>
            <DeletedFiles token={token} deleteOpen={deleteOpen} onClose={deleteItemClose} folder={folder} file={file}/>
        </>
    );
};

export default MoreButton;
