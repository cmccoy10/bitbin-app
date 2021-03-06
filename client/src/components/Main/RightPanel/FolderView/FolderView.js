import React, { useCallback, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, TextField, Divider } from '@material-ui/core';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { faFileAlt, faFileAudio, faFileImage, faFileVideo, faFilePdf, faFileArchive } from '@fortawesome/free-regular-svg-icons'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import MoreButton from './MoreButton/MoreButton';
import { editFolder } from '../../../../store/ducks/folders';
import { editFile } from '../../../../store/ducks/files';
import Dropzone from './Dropzone';
import "./FolderView.css"


const useStyles = makeStyles((theme) => ({
    folderContainer: {
        paddingLeft: "3em",
        paddingRight: "3em",
        width: "100%",
        height: "100%",
        position: "relative"
    },
    folderHeader: {
        width: "100%",
        paddingBottom: ".5em",
        borderBottom: "1px solid #e6e8eb"
    },
    navLink: {
        textDecoration: "none",
        color: "black"
    },
    folderListContainer: {
        display: "flex",
        flexDirection: "column",
        width: "100%"
    },
    folderListItem: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingTop: ".5em",
        paddingBottom: ".5em",
        paddingLeft: ".5em",
        justifyContent: "space-between",
        cursor: "",
        "&:hover": {
            background: "#e5e5e5",
        },
    },
    listHeader: {
        paddingTop: "3em",
        paddingBottom: ".5em"
    },
    icon: {
        paddingRight: ".5em"
    },
    nameAndIcon: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    ellipsisContainer: {
        paddingRight: ".5em",
    },

}));


const FolderView = ({ isDeleted }) => {
    const folders = useSelector(state => state.folders);
    const files = useSelector(state => state.files);
    const currentFolder = useSelector(state => state.currentFolder);
    const [clickedFolder, setClickedFolder] = useState(null);
    const [clickedFile, setClickedFile] = useState(null);
    const [folderName, setFolderName] = useState(null);
    const [fileName, setFileName] = useState(null);
    const dispatch = useDispatch();
    const classes = useStyles();


    const handleEdit = (e) => {
        if (e.key === "Enter") {
            if (clickedFolder) {
                dispatch(editFolder({ "id":clickedFolder, "name":folderName }));
                setClickedFolder(null);
                setFolderName(null);
            } else {
                dispatch(editFile({ "id":clickedFile, "fileName":fileName }))
                setClickedFile(null);
                setFileName(null);
            }
        }
    }

    const handleChange = (e) => {
        if (clickedFolder) {
            setFolderName(e.target.value);
        } else {
            setFileName(e.target.value);
        }
    }

    const handleEditCancel = () => {
        if (clickedFolder) {
            setClickedFolder(null);
            setFolderName(null);
        } else {
            setClickedFile(null);
            setFileName(null);
        }
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

    return (
        <Box className={classes.folderContainer}>
            <Box className="folderViewHeader">
                Overview
            </Box>
            <Box className={classes.listHeader}>
                <Box>
                    <Typography>Name</Typography>
                </Box>
            </Box>
            <Divider />
            <Box className={classes.folderListContainer}>
                {Object.values(files).map(file => {
                    return (
                    <Box key={file.id}>
                        <Box className={classes.folderListItem}>
                            {fileName && clickedFile === file.id ?
                                <Box className={classes.nameAndIcon}>
                                    <Box className={classes.icon}>
                                        {fileImage(file.mimetype)}
                                    </Box>
                                    <Box>
                                        <TextField color="secondary" defaultValue={fileName}
                                        onKeyPress={handleEdit} onBlur={handleEditCancel}
                                        onChange={handleChange}/>
                                    </Box>
                                </Box>
                                :
                                <a href={file.itemUrl} target="_blank" className={classes.navLink}>
                                    <Box className={classes.nameAndIcon}>
                                        <Box className={classes.icon}>
                                            {fileImage(file.mimetype)}
                                        </Box>
                                        <Box>
                                            <Typography>{file.fileName}</Typography>
                                        </Box>
                                    </Box>
                                </a>
                            }
                            {isDeleted ?
                            null
                            :
                            <Box className={classes.ellipsisContainer}>
                                <MoreButton file={file} setFileName={setFileName} setClickedFile={setClickedFile}/>
                            </Box>
                            }
                        </Box>
                        <Divider />
                    </Box>
                    )
                })}
                {Object.values(folders).map(folder => {
                    return (
                    <Box key={folder.id}>
                        <Box className={classes.folderListItem}>
                            {folderName && clickedFolder === folder.id ?
                                <Box className={classes.nameAndIcon}>
                                    <Box className={classes.icon}>
                                        <FontAwesomeIcon icon={faFolder} size="2x" color="#91ceff"/>
                                    </Box>
                                    <Box>
                                        <TextField color="secondary" defaultValue={folderName}
                                            onKeyPress={handleEdit} onBlur={handleEditCancel}
                                            onChange={handleChange}/>
                                    </Box>
                                </Box>
                                :
                                <Link to={`/folders/${folder.id}`} className={classes.navLink}>
                                    <Box className={classes.nameAndIcon}>
                                        <Box className={classes.icon}>
                                            <FontAwesomeIcon icon={faFolder} size="2x" color="#91ceff"/>
                                        </Box>
                                        <Box>
                                            <Typography>{folder.name}</Typography>
                                        </Box>
                                    </Box>
                                </Link>
                            }
                            {isDeleted ?
                            null
                            :
                            <Box className={classes.ellipsisContainer}>
                                <MoreButton folder={folder} setFolderName={setFolderName} setClickedFolder={setClickedFolder}/>
                            </Box>
                            }
                        </Box>
                        <Divider />
                    </Box>
                    )
                })}
            </Box>
        </Box>
    );
};

export default FolderView;
