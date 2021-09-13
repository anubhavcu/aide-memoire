import axios from 'axios';
import {
  NOTES_LIST_FAIL,
  NOTES_LIST_REQUEST,
  NOTES_LIST_SUCCESS,
} from '../constants/notesConstants';

export const listNotes = () => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTES_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    console.log(userInfo.token);

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/notes', config);

    dispatch({ type: NOTES_LIST_SUCCESS, payload: data });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch({ type: NOTES_LIST_FAIL, payload: message });
  }
};
