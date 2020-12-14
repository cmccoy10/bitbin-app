import React from 'react';
import "./RightPanel.css"
import NewDataPanel from './NewDataPanel';
import BreadCrumbs from './BreadCrumbs';
import FolderView from './FolderView/FolderView';
import { Route, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles, getFolders } from '../../../store/ducks/folders';
import { useEffect } from 'react';
import { setCurrentFolder } from '../../../store/ducks/currentFolder';
import { getBreadcrumbs } from '../../../store/ducks/breadcrumbs';
import { useState } from 'react';
import RestorePanel from './RestorePanel';
import DeletedFolders from './DeletedFolders.js/DeletedFolders';
import Dropzone from './FolderView/Dropzone';


const RightPanel = ({ deletedId }) => {
    const { id } = useParams();
    const currentFolder = useSelector(state => state.currentFolder);
    const [clickedFolder, setClickedFolder] = useState(null);
    const [clickedFile, setClickedFile] = useState(null);
    const [isDeleted, setIsDeleted] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentFolder(Number(id)));
        dispatch(getFiles())
        dispatch(getFolders())
        dispatch(getBreadcrumbs())
        if (Number(id) === deletedId) {
            setIsDeleted(true);
        } else {
            setIsDeleted(false);
        }
        setClickedFile(null);
        setClickedFolder(null);
    }, [id]);

    return (
        <div className="rightPanelContainer">
            <div className="breadCrumbsContainer">
                <BreadCrumbs currentFolder={currentFolder} isDeleted={isDeleted}/>
            </div>
            <Route path="/home">
                <div>

                </div>
                <div className="newDataPanelContainer">
                    <NewDataPanel currentFolder={currentFolder}/>
                </div>
            </Route>
            <Route path="/folders/:id">
                {isDeleted ?
                <div className="folderViewContainer">
                    <DeletedFolders setClickedFile={setClickedFile}
                    setClickedFolder={setClickedFolder} clickedFile={clickedFile}
                    clickedFolder={clickedFolder} isDeleted={isDeleted}/>
                </div>
                :
                <div className="folderViewContainer">
                    <FolderView currentFolder={currentFolder}/>
                </div>
                }
                {isDeleted ?
                <div className="restorePanelContainer">
                    <RestorePanel clickedFolder={clickedFolder} clickedFile={clickedFile}/>
                </div>
                :
                <div className="newDataPanelContainer">
                    <NewDataPanel currentFolder={currentFolder}/>
                </div>
                }
            </Route>
        </div>
    );
};

export default RightPanel;
