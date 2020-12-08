import { apiUrl } from '../../config/config';
import { loadFiles } from './files';


// Types


// Actions


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

// Reducer
