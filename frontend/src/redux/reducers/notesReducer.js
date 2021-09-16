import {
  NOTES_CREATE_FAIL,
  NOTES_CREATE_REQUEST,
  NOTES_CREATE_SUCCESS,
  NOTES_LIST_FAIL,
  NOTES_LIST_REQUEST,
  NOTES_LIST_SUCCESS,
  NOTES_UPDATE_FAIL,
  NOTES_UPDATE_REQUEST,
  NOTES_UPDATE_SUCCESS,
  NOTES_DELETE_REQUEST,
  NOTES_DELETE_SUCCESS,
  NOTES_DELETE_FAIL,
} from '../constants/notesConstants';

const initialState = {
  notes: [],
  // loading: false,
  // error: '',
};

// fetching notes
export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTES_LIST_REQUEST:
      return { loading: true };
    case NOTES_LIST_SUCCESS:
      return { loading: false, notes: action.payload };

    case NOTES_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// creating a note
export const createNoteReducer = (
  state = { loading: false, error: '', success: null },
  action
) => {
  switch (action.type) {
    case NOTES_CREATE_REQUEST:
      return { ...state, loading: true, error: '', success: false };
    case NOTES_CREATE_SUCCESS:
      return { ...state, loading: false, success: true, error: '' };
    case NOTES_CREATE_FAIL:
      return {
        error: action.payload,
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};

// updating a note
export const noteUpdateReducer = (
  state = { loading: false, error: '', success: null },
  action
) => {
  switch (action.type) {
    case NOTES_UPDATE_REQUEST:
      return { ...state, loading: true, error: '', success: false };
    case NOTES_UPDATE_SUCCESS:
      return { ...state, loading: false, error: '', success: true };

    case NOTES_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
      };

    default:
      return state;
  }
};

export const noteDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTES_DELETE_REQUEST:
      return { loading: true, success: false };
    case NOTES_DELETE_SUCCESS:
      return { loading: false, success: true };
    case NOTES_DELETE_FAIL:
      return { loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};
