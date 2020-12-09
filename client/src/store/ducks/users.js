import { apiUrl } from '../../config/config';

// Types
const LOAD_USER = "bitbin/users/load";
export const USER_ID = 'bitbin/authentication/userId';

// Actions
export const loadUser = (user) => ({ type: LOAD_USER, user });

// Thunks
export const getUser = () => async (dispatch, getState) => {
    const id = window.localStorage.getItem(USER_ID);
    const { authentication: { token } } = getState();
    const response = await fetch(`${apiUrl}/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    if (response.ok) {
        const { userObj } = await response.json();
        const user = {};
        user[userObj.id] = userObj;
        dispatch(loadUser(userObj));
        return;
    }
}

// Reducer
export default function reducer(state = {}, action) {
    switch (action.type) {
        case LOAD_USER: {
            return { ...action.user }
        }
        default:
            return state;
    }
}
