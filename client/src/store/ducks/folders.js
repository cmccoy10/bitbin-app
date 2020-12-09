import { apiUrl } from '../../config/config';
import { loadFiles } from './files';
import { USER_ID } from './users';


// Types
const LOAD_FOLDERS = "bitbin/folders/load";
const ADD_FOLDER = "bitbin/folders/add";

// Actions
export const loadFolders = (folders) => ({ type: LOAD_FOLDERS, folders });
export const addFolder = (folder) => ({ type: ADD_FOLDER, folder });

// Thunks
export const getFiles = () => async (dispatch, getState) => {
    const { authentication: { token } } = getState();
    const id = getState().currentFolder;
    const response = await fetch(`${apiUrl}/folders/${id}/files`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    if (response.ok) {
        const list = await response.json();
        const files = {};
        list.map((file) => {
            files[file.id] = file;
        });
        dispatch(loadFiles(files));
        return;
    }
}

export const getFolders = () => async (dispatch, getState) => {
    const { authentication: { token } } = getState();
    const id = getState().currentFolder;
    const response = await fetch(`${apiUrl}/folders/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    if (response.ok) {
        const folders = await response.json();
        dispatch(loadFolders(folders));
        return;
    }
}

export const createFolder = ({ name }) => async (dispatch, getState) => {
    const { authentication: { token } } = getState();
    const parentId = getState().currentFolder;
    const ownerId = window.localStorage.getItem(USER_ID);
    const response = await fetch(`${apiUrl}/folders`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, parentId, ownerId}),
    });
    if (response.ok) {
        const folder = await response.json();
        // const newFolder = {}
        // newFolder[folder.id] = folder
        dispatch(addFolder(folder));
        return;
    }
}


// Reducer
export default function reducer(state = {}, action) {
    switch (action.type) {
        case LOAD_FOLDERS: {
            return { ...action.folders }
        }
        case ADD_FOLDER: {
            let newState = { ...state };
            newState[action.folder.id] = action.folder;
            return newState;
        }
        default:
            return state;
    }
}
