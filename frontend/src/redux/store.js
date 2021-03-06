import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {
  createNoteReducer,
  noteDeleteReducer,
  notesReducer,
  noteUpdateReducer,
} from './reducers/notesReducer';
import {
  userDeleteReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from './reducers/userReducers';
import { themeReducer } from './reducers/themeReducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  notesList: notesReducer,
  createNote: createNoteReducer,
  noteUpdate: noteUpdateReducer,
  noteDelete: noteDeleteReducer,
  updateUser: userUpdateReducer,
  theme: themeReducer,
  deleteUser: userDeleteReducer,
});

// get user info (if present) from local storage and add it to store's state
// so that if user doesn't logout and reload the application, state gets user data from localStorage
// and makes user logged in
const userInfoFromLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage, loading: false, error: '' },
  //     userRegister: {
  //       userInfo: userInfoFromLocalStorage,
  //       loading: false,
  //       error: '',
  //     },
};

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
