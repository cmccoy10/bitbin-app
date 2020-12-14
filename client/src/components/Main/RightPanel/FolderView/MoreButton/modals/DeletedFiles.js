import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { faFileAlt, faFileAudio, faFileImage, faFileVideo, faFilePdf, faFileArchive } from '@fortawesome/free-regular-svg-icons'
import { Box } from '@material-ui/core';
import { moveFolderToDeleted } from '../../../../../../store/ducks/folders';
import { moveFileToDeleted } from '../../../../../../store/ducks/files';



const useStyles = makeStyles((theme) => ({
    deleteButton: {
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

const DeletedFiles = (props) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        if (props.folder) {
            dispatch(moveFolderToDeleted({ "childId": props.folder.id }))
        } else if (props.file) {
            dispatch(moveFileToDeleted({ "id": props.file.id, "folderId": props.file.folderId }));
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
                open={props.deleteOpen}
                onClose={props.newFolderClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    <Box className={classes.dialogTitleContainer}>
                        {props.folder ?
                        <FontAwesomeIcon icon={faFolder} size="2x" color="#91ceff"/>
                        :
                        fileImage(props.file.mimetype)
                        }
                        <Typography variant="h6" className={classes.dialogTitle}>Delete {props.folder ? "folder" : "file"}?</Typography>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Box>
                        <Typography>Are you sure you want to delete this {props.folder ? "folder" : "file"}?</Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="other" variant="contained" disableElevation onClick={props.onClose}>Cancel</Button>
                    <Button className={classes.deleteButton} variant="contained" disableElevation onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeletedFiles;
