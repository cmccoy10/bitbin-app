import { apiUrl } from '../../config/config';

// Types
const UPLOAD = "bitbin/files/upload";
const LOAD_FILES = "bitbin/files/load";
const ADD_FILE = "bitbin/files/add";
const EDIT_FILE = "bitbin/files/edit_name";

// Actions
export const loadFiles = (files) => ({ type: LOAD_FILES, files });
export const addFile = (file) => ({ type: ADD_FILE, file });
export const editFileName = (file) => ({ type: EDIT_FILE, file });

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
        // console.log("\n\n", file, "\n\n");
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
        default:
            return state;
    }
}
