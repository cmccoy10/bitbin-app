import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { TextField } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { Box } from '@material-ui/core';
import { createFolder } from '../../../../store/ducks/folders';


const useStyles = makeStyles((theme) => ({
    createButton: {
      background: "#0070e0",
      color: "white"
    },
    dialogTitleContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    dialogTitle: {
        paddingLeft: "1em"
    },
}));

const PermDelete = (props) => {
    const [name, setName] = useState("");
    const dispatch = useDispatch();

    const handleCreate = () => {
        dispatch(createFolder({ name }));
        props.onClose();
    }

    const updateName = (e) => {
        setName(e.target.value);
    }

    const classes = useStyles();
    return (
        <div>
            <Dialog
                fullWidth={true}
                open={props.open}
                onClose={props.newFolderClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    <Box className={classes.dialogTitleContainer}>
                        <FontAwesomeIcon icon={faFolder} size="2x" color="#91ceff"/>
                        <Typography variant="h6" className={classes.dialogTitle}>Create folder</Typography>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="Folder name"
                        onChange={updateName}
                        variant="outlined"
                        color="secondary"
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="other" variant="contained" disableElevation onClick={props.onClose}>Cancel</Button>
                    <Button className={classes.createButton} variant="contained" disableElevation onClick={handleCreate} disabled={name === ""}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PermDelete;
