import { apiUrl } from '../../config/config';

// Types
const UPLOAD = "bitbin/files/upload";
const LOAD_FILES = "bitbin/files/load";

// Actions
export const loadFiles = (files) => ({ type: LOAD_FILES, files });


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
        const { file } = await response.json();
        // console.log("\n\n", file, "\n\n");
        return;
    }
}

// Reducer
export default function reducer(state = {}, action) {
    switch (action.type) {
        case LOAD_FILES: {
            return { ...action.files }
        }
        default:
            return state;
    }
}
