import { apiUrl } from '../../config/config';

// Types
const UPLOAD = "bitbin/files/upload";
const LOAD_FILES = "bitbin/files/load";
const ADD_FILE = "bitbin/files/add";
const EDIT_FILE = "bitbin/files/edit_name";
const REMOVE_FILE = "bitbin/files/remove"

// Actions
export const loadFiles = (files) => ({ type: LOAD_FILES, files });
export const addFile = (file) => ({ type: ADD_FILE, file });
export const editFileName = (file) => ({ type: EDIT_FILE, file });
export const removeFile = (fileId) => ({ type: REMOVE_FILE, fileId });

// Thunks
export const uploadFile = (data) => async (dispatch, getState) => {
    const { authentication: { token } } = getState();
    const response = await fetch(`${apiUrl}/files`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: data,
    });
    if (response.ok) {
        const file = await response.json();

        dispatch(addFile(file));
        return;
    }
}

export const editFile = ({ id, fileName }) => async (dispatch, getState) => {
    const { authentication: { token } } = getState();
    const response = await fetch(`${apiUrl}/files/${id}/editName`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fileName }),
    });
    if (response.ok) {
        const file = await response.json();
        dispatch(editFileName(file));
        return;
    }
}

export const moveFileLocation = ({ id, folderId }) => async (dispatch, getState) => {
    const { authentication: { token } } = getState();
    const response = await fetch(`${apiUrl}/files/${id}/move`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ folderId }),
    });
    if (response.ok) {
        const fileId = await response.json();
        dispatch(removeFile(fileId));
        return;
    }
}

export const restoreFile = ({ id, previousFolderId }) => async (dispatch, getState) => {
    const { authentication: { token } } = getState();
    const response = await fetch(`${apiUrl}/files/${id}/restore`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ previousFolderId }),
    });
    if (response.ok) {
        const fileId = await response.json();
        dispatch(removeFile(fileId));
        return;
    }
}

export const moveFileToDeleted = ({ id, folderId }) => async (dispatch, getState) => {
    const parentId = getState().users.trashBinId;
    const { authentication: { token } } = getState();
    const response = await fetch(`${apiUrl}/files/${id}/delete`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ folderId, parentId }),
    });
    if (response.ok) {
        const fileId = await response.json();
        dispatch(removeFile(fileId));
        return;
    }
}

// Reducer
export default function reducer(state = {}, action) {
    switch (action.type) {
        case LOAD_FILES: {
            return { ...action.files }
        }
        case ADD_FILE: {
            let newState = { ...state };
            newState[action.file.id] = action.file;
            return newState;
        }
        case EDIT_FILE: {
            let newState = { ...state };
            newState[action.file.id] = action.file;
            return newState;
        }
        case REMOVE_FILE: {
            let newState = { ...state };
            delete newState[action.fileId];
            return newState;
        }
        default:
            return state;
    }
}
