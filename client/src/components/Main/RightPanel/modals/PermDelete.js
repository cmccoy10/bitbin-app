import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { TextField } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { faFileAlt, faFileAudio, faFileImage, faFileVideo, faFilePdf, faFileArchive } from '@fortawesome/free-regular-svg-icons'
import { Box } from '@material-ui/core';
import { permDeleteFile } from '../../../../store/ducks/files';
import { permDeleteFolder } from '../../../../store/ducks/folders';


const useStyles = makeStyles((theme) => ({
    permButton: {
        background: "#0070e0",
        color: "white",
        textTransform: "none",
    },
    buttonStyle: {
        textTransform: "none",
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
    const dispatch = useDispatch();
    let folder = props.clickedFolder;
    let file = props.clickedFile;

    const handlePermDelete = () => {
        if (folder) {
            dispatch(permDeleteFolder({ "id": folder.id }));
        } else {
            dispatch(permDeleteFile ({ "id": file.id, "key": file.key }));
        }
        props.onClose();
    }

    function fileImage( mimetype ) {
        const type = mimetype.split("/");
        let check = type[0];
        if (type[1] === "pdf") {
            check = "pdf"
        }
        if (type[1] === "zip") {
            check = "zip"
        }
        return (
          <div>
            {(function() {
              switch (check) {
                case 'audio':
                  return <FontAwesomeIcon icon={faFileAudio} size="2x"/>;
                case 'video':
                  return <FontAwesomeIcon icon={faFileVideo} size="2x"/>;
                case 'image':
                  return <FontAwesomeIcon icon={faFileImage} size="2x"/>;
                case 'pdf':
                  return <FontAwesomeIcon icon={faFilePdf} size="2x"/>;
                case 'zip':
                  return <FontAwesomeIcon icon={faFileArchive} size="2x"/>;
                default:
                  return <FontAwesomeIcon icon={faFileAlt} size="2x"/>;
              }
            })()}
          </div>
        );
      }

    const classes = useStyles();
    return (
        <div>
            <Dialog
                fullWidth={true}
                open={props.permOpen}
                onClose={props.permItemClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    <Box className={classes.dialogTitleContainer}>
                        {folder ?
                        <FontAwesomeIcon icon={faFolder} size="2x" color="#91ceff"/>
                        :
                        fileImage(file.mimetype)
                        }
                        <Typography variant="h6" className={classes.dialogTitle}>{`Permanently delete ${folder ? folder.name : file.fileName}`}</Typography>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Typography>{`This ${folder ? "folder" : "file"} will be gone forever and you won’t be able to restore it.`}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button className={classes.buttonStyle} color="other" variant="contained" disableElevation onClick={props.onClose}>Cancel</Button>
                    <Button className={classes.permButton} variant="contained" disableElevation onClick={handlePermDelete}>Permanently delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PermDelete;
