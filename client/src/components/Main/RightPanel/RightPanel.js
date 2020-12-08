import React from 'react';
import "./RightPanel.css"
import NewDataPanel from './NewDataPanel';
import BreadCrumbs from './BreadCrumbs';
import FolderView from './FolderView/FolderView';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getFiles, getFolders } from '../../../store/ducks/folders';
import { useEffect } from 'react';
import { setCurrentFolder } from '../../../store/ducks/currentFolder';


const RightPanel = () => {
    const { id } = useParams()

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentFolder(Number(id)));
        dispatch(getFiles())
        dispatch(getFolders())
    }, []);

    return (
        <div className="rightPanelContainer">
            <div className="breadCrumbsContainer">
                <BreadCrumbs/>
            </div>
            <div className="folderViewContainer">
                <FolderView/>
            </div>
            <div className="newDataPanelContainer">
                <NewDataPanel/>
            </div>
        </div>
    );
};

export default RightPanel;
