import React, { useCallback, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, TextField, Divider } from '@material-ui/core';
import { useDropzone } from 'react-dropzone'
import { useSelector, useDispatch } from 'react-redux';
import { uploadFile } from '../../../../store/ducks/files';


const baseStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: '20px',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#bdbdbd',
    borderStyle: 'solid',
    backgroundColor: '#f2f2f2',
    color: '#66666696',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    height: '13em',
    width: '19em'
  };

const activeStyle = {
    borderColor: 'yellow',
    flex: 1,
    padding: '20px',
    borderWidth: 1,
    borderRadius: 2,
    borderStyle: 'solid',
    backgroundColor: '#f2f2f2',
    color: '#0d2481',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    height: '13em',
    width: '19em'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};



const Dropzone = () => {
    // const currentFolder = useSelector(state => state.currentFolder);
    const dispatch = useDispatch();

    const onDrop = useCallback(acceptedFiles => {
        const data = new FormData();
        const file = acceptedFiles[0];
        data.append("file", file);
        console.log("dropped")
        // dispatch(uploadFile(data));
    }, [])

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
      } = useDropzone({onDrop, noClick: true});

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);


    return (
        <div {...getRootProps({style})}>
            <input {...getInputProps()} />
            <Typography>Drop a file here to quickly upload</Typography>
        </div>
    );
  }

  export default Dropzone;
