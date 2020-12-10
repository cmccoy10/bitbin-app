import React from 'react';
import { Popover, Box, List, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';


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
    const file = props.file;
    const folder = props.folder;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRename = () => {
        if (file) {
            props.setClickedFile(file.id);
            props.setFileName(file.fileName);
        } else {
            props.setClickedFolder(folder.id);
            props.setFolderName(folder.name);
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
                    <Box className={classes.popoverOption} onClick={handleRename}>
                        <Typography>Rename</Typography>
                    </Box>
                    <Box className={classes.popoverOption}>
                        <Typography>Move</Typography>
                    </Box>
                    <Box className={classes.popoverOption}>
                        <Typography>Delete</Typography>
                    </Box>
                </Box>
            </Popover>
        </>
    );
};

export default MoreButton;
