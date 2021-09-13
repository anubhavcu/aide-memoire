import {
  NOTES_LIST_FAIL,
  NOTES_LIST_REQUEST,
  NOTES_LIST_SUCCESS,
} from '../constants/notesConstants';

const initialState = {
  notes: [],
  loading: false,
  error: '',
};

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
