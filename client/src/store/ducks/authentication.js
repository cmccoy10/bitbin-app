import { apiUrl } from '../../config';
import { USER_ID } from './users';


const TOKEN_KEY = 'bitbin/authentication/token';

const SET_TOKEN = 'bitbin/authentication/SET_TOKEN';
const REMOVE_TOKEN = 'bitbin/authentication/REMOVE_TOKEN';

export const removeToken = token => ({ type: REMOVE_TOKEN });
export const setToken = token => ({ type: SET_TOKEN, token });

export const loadToken = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN_KEY);
  if (token) {
    dispatch(setToken(token));
  }
};

export const signUp = user => async dispatch => {
  const response = await fetch(`${apiUrl}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (response.ok) {
    const { token, userObj } = await response.json();
    const user = {};
    user[userObj.id] = userObj
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(USER_ID, userObj.id);
    dispatch(setToken(token));
  } else {
    const errors = await response.json();
    return errors;
  }
}

export const login = (email, password) => async dispatch => {
  const response = await fetch(`${apiUrl}/session`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const { token, userObj } = await response.json();
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(USER_ID, userObj.id);
    dispatch(setToken(token));
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const logout = () => async (dispatch, getState) => {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_ID);
    dispatch(removeToken());
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_TOKEN: {
      return {
        ...state,
        token: action.token,
      };
    }

    case REMOVE_TOKEN: {
      const newState = { ...state };
      delete newState.token;
      return newState;
    }

    default: return state;
  }
}
