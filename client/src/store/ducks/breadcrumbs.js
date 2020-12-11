import { apiUrl } from '../../config';

// Types
const ADD_FOLDER = "bitbin/breadcrumbs/add";
const LOAD_BREADCRUMBS = "bitbin/breadcrumbs/load";

// Actions
export const addFolder = (folder) => ({ type: ADD_FOLDER, folder });
export const loadBreadcrumbs = (folders) => ({ type: LOAD_BREADCRUMBS, folders });

// Thunks
export const getBreadcrumbs = () => async (dispatch, getState) => {
    const { authentication: { token } } = getState();
    const id = getState().currentFolder;
    const response = await fetch(`${apiUrl}/folders/${id}/breadcrumbs`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    if (response.ok) {
        const folders = await response.json();
        dispatch(loadBreadcrumbs(folders));
        return;
    }
}

// Reducer
export default function reducer(state = [], action) {
    switch (action.type) {
        case ADD_FOLDER: {
            return [ ...action.folder ]
        }
        case LOAD_BREADCRUMBS: {
            return [ ...action.folders ];
        }
        default:
            return state;
    }
}
