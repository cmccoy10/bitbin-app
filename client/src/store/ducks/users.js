
// Types
const LOAD_USER = "bitbin/users/load";

// Actions
export const loadUser = (user) => ({ type: LOAD_USER, user });

// Thunks


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
