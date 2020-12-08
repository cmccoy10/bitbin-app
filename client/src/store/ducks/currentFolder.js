const SET_CURRENT = "bitbin/currentFolder/set_current";

export const setCurrentFolder = (id) => ({ type: SET_CURRENT, id });

export default function reducer(state = null, action) {
  switch (action.type) {
    case SET_CURRENT: {
      return action.id;
    }
    default:
      return state;
  }
}
