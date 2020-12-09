import React from 'react';
import { Popover, Box, List, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';


const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    avatar: {
      marginLeft: "auto",
      backgroundColor: theme.palette.primary.main,
    },
    list: {
      borderTop: "1px solid #f2f2f2",
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

const MoreButton = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

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
                <Box>
                    <Typography>Rename</Typography>
                </Box>
                <Box>
                    <Typography>Move</Typography>
                </Box>
                <Box>
                    <Typography>Delete</Typography>
                </Box>
            </Popover>
        </>
    );
};

export default MoreButton;
