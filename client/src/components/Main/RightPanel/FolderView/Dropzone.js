import React, { useCallback, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, TextField, Divider } from '@material-ui/core';
import { useDropzone } from 'react-dropzone'
import { useSelector, useDispatch } from 'react-redux';
import { uploadFile } from '../../../../store/ducks/files';


const hiddenStyle = {
    // disabled: true,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: 'black',
    borderStyle: 'dashed',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    height: '100%',
    width: '100%'
}

const baseStyle = {
    // display: 'none',
    // visibility: 'hidden',
    flex: 1,
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    // backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    position: 'absolute',
    height: '100%',
    width: '100%'
  };

const activeStyle = {
    borderColor: '#2196f3',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    position: 'absolute',
    height: '100%',
    width: '100%'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};



const Dropzone = ({ currentFolder }) => {
    // const currentFolder = useSelector(state => state.currentFolder);
    const dispatch = useDispatch();

    const onDrop = useCallback(acceptedFiles => {
        const data = new FormData();
        const file = acceptedFiles[0];
        data.append("file", file);
        console.log("File", file)
        console.log(data)

        dispatch(uploadFile(data));
    }, [])

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
      } = useDropzone({onDrop});

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
        </div>
    );
  }

  export default Dropzone;
