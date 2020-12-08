import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    folderContainer: {
        paddingLeft: "3em",
        paddingRight: "3em",
        width: "100%",
        height: "100%",
    },
    folderHeader: {
        width: "100%",
        paddingBottom: ".5em",
        borderBottom: "1px solid #e6e8eb"
    },
}));

const FolderView = () => {

    const classes = useStyles()
    return (
        <Box className={classes.folderContainer}>
            <Box className={classes.folderHeader}>
                <Typography variant="h6">Overview</Typography>
            </Box>
        </Box>
    );
};

export default FolderView;
