import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, List, Typography, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';

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
    const folders = useSelector(state => state.folders);
    const classes = useStyles()
    return (
        <Box className={classes.folderContainer}>
            <Box className={classes.folderHeader}>
                <Typography variant="h6">Overview</Typography>
            </Box>
            <Box>
                <List>
                    {Object.values(folders).map(folder => {
                        return (
                        <Box>
                            <ListItem>
                            <ListItemIcon>
                                <FontAwesomeIcon icon={faFolder} size="2x" color="#91ceff"/>
                            </ListItemIcon>
                            <ListItemText
                                primary={folder.name}
                            />
                            </ListItem>
                        </Box>
                        )
                    })}
                </List>
            </Box>
        </Box>
    );
};

export default FolderView;
