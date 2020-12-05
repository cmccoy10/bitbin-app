import { apiUrl } from '../../config/config';

// Types
const UPLOAD = "bitbin/file/upload";


// Actions



// Thunks
export const uploadFile = (data) => async (dispatch, getState) => {
    const { authentication: { token } } = getState();
    console.log("Inside thunk", data)
    const response = await fetch(`${apiUrl}/files`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: data,
    });
    if (response.ok) {
        const { file } = await response.json();
        console.log("\n\n", file, "\n\n");
        return;
    }
}
// Reducer
