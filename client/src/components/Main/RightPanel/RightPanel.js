import React from 'react';
import "./RightPanel.css"
import NewDataPanel from './NewDataPanel';
import BreadCrumbs from './BreadCrumbs';
import FolderView from './FolderView/FolderView';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles, getFolders } from '../../../store/ducks/folders';
import { useEffect } from 'react';
import { setCurrentFolder } from '../../../store/ducks/currentFolder';
import { getBreadcrumbs } from '../../../store/ducks/breadcrumbs';


const RightPanel = () => {
    const { id } = useParams()
    const currentFolder = useSelector(state => state.currentFolder);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentFolder(Number(id)));
        dispatch(getFiles())
        dispatch(getFolders())
        dispatch(getBreadcrumbs())
    }, [id]);

    return (
        <div className="rightPanelContainer">
            <div className="breadCrumbsContainer">
                <BreadCrumbs currentFolder={currentFolder}/>
            </div>
            <div className="folderViewContainer">
                <FolderView currentFolder={currentFolder}/>
            </div>
            <div className="newDataPanelContainer">
                <NewDataPanel currentFolder={currentFolder}/>
            </div>
        </div>
    );
};

export default RightPanel;
