import {
  NOTES_CREATE_FAIL,
  NOTES_CREATE_REQUEST,
  NOTES_CREATE_SUCCESS,
  NOTES_LIST_FAIL,
  NOTES_LIST_REQUEST,
  NOTES_LIST_SUCCESS,
} from '../constants/notesConstants';

const initialState = {
  notes: [],
  loading: false,
  error: '',
};

// fetching notes
export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTES_LIST_REQUEST:
      return { ...state, loading: true };
    case NOTES_LIST_SUCCESS:
      return { ...state, loading: false, notes: action.payload };

    case NOTES_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };

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
      return { ...state, loading: true, error: '' };
    case NOTES_CREATE_SUCCESS:
      return { ...state, loading: false, success: true, error: '' };
    case NOTES_CREATE_FAIL:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
