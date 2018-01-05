import axios from 'axios';
import { FETCH_USER } from './types';

// returning fetch_user action
// return action until AJAX request is completed
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};