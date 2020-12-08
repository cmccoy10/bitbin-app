import { apiUrl } from '../../config/config';
import { loadFiles } from './files';


// Types
const LOAD_FOLDERS = "bitbin/folders/load";

// Actions
export const loadFolders = (folders) => ({ type: LOAD_FOLDERS, folders });

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

// Reducer
export default function reducer(state = {}, action) {
    switch (action.type) {
        case LOAD_FOLDERS: {
            return { ...action.folders }
        }
        default:
            return state;
    }
}
