import React from 'react';
import "./RightPanel.css"
import NewDataPanel from './NewDataPanel';
import BreadCrumbs from './BreadCrumbs';
import FolderView from './FolderView/FolderView';


const RightPanel = () => {
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
