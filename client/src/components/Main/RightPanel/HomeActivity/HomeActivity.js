import React, { useCallback, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, TextField, Divider } from '@material-ui/core';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { faFileAlt, faFileAudio, faFileImage, faFileVideo, faFilePdf, faFileArchive } from '@fortawesome/free-regular-svg-icons'


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
    accordianHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
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

}));


const HomeActivity = ({ recentData }) => {
    const folders = useSelector(state => state.folders);
    const files = useSelector(state => state.files);
    const currentFolder = useSelector(state => state.currentFolder);
    const [clickedFolder, setClickedFolder] = useState(null);
    const [clickedFile, setClickedFile] = useState(null);
    const [folderName, setFolderName] = useState(null);
    const [fileName, setFileName] = useState(null);
    const dispatch = useDispatch();
    const classes = useStyles();


    if (!recentData) return null

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
            <Box>
                <Box className={classes.accordianHeader}>
                    <Typography>Recent</Typography>
                    <Typography>Show</Typography>
                </Box>
                <Divider />
                <Box>
                    {recentData.map(data => {
                        return (
                        <Box key={data.id}>
                            <Box className={classes.folderListItem}>
                                {data.fileName ?
                                <a href={data.itemUrl} className={classes.navLink}>
                                    <Box className={classes.nameAndIcon}>
                                        <Box className={classes.icon}>
                                            {fileImage(data.mimetype)}
                                        </Box>
                                        <Box>
                                            <Typography>{data.fileName}</Typography>
                                        </Box>
                                    </Box>
                                </a>
                                :
                                <Link to={`/folders/${data.id}`} className={classes.navLink}>
                                    <Box className={classes.nameAndIcon}>
                                        <Box className={classes.icon}>
                                            <FontAwesomeIcon icon={faFolder} size="2x" color="#91ceff"/>
                                        </Box>
                                        <Box>
                                            <Typography>{data.name}</Typography>
                                        </Box>
                                    </Box>
                                </Link>
                                }
                            </Box>
                            <Divider />
                        </Box>
                        )
                    })}
                </Box>
            </Box>
            <Box>

            </Box>
        </Box>
    )
};

export default HomeActivity;
