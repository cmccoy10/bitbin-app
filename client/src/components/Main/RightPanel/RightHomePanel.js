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
import { apiUrl } from '../../../config';
import HomeActivity from './HomeActivity/HomeActivity';


const RightHomePanel = (props) => {
    const { id } = useParams();
    const currentFolder = useSelector(state => state.currentFolder);
    const userId = useSelector(state => state.users.id);
    // const [clickedFolder, setClickedFolder] = useState(null);
    // const [clickedFile, setClickedFile] = useState(null);
    const [isDeleted, setIsDeleted] = useState(false);
    const [recentData, setRecentData] = useState();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(setCurrentFolder(Number(id)));
        // dispatch(getFiles())
        // dispatch(getFolders())
        // dispatch(getBreadcrumbs())
        (async () => {
            const response = await fetch(`${apiUrl}/users/${userId}/recent`, {
                headers: {
                    Authorization: `Bearer ${props.token}`
                },
            });
            if (response.ok) {
                const sortedData = await response.json();
                setRecentData(sortedData)
            }
        })()
    }, [userId]);


    return (
        <div className="rightPanelContainer">
            <div className="breadCrumbsContainer">
                <BreadCrumbs currentFolder={currentFolder} isDeleted={isDeleted}/>
            </div>
            <div className="folderViewContainer">
                <HomeActivity recentData={recentData}/>
            </div>
            <div className="newDataPanelContainer">
                <NewDataPanel currentFolder={currentFolder}/>
            </div>
        </div>
    );
};

export default RightHomePanel;
