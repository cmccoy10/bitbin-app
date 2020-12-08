import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import authentication from "./ducks/authentication";
import files from "./ducks/files";
import currentFolder from "./ducks/currentFolder";
import folders from "./ducks/folders"
import users from "./ducks/users"


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  authentication, files, currentFolder, folders, users
});

const configureStore = (initialState) => {
  return createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
