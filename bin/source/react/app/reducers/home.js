import * as types from '../constants/ActionTypes'
import { handleActions, } from 'redux-actions';

const initialState = {
  movies: {},
};

const handler = {};

handler[types.RECEIVE_MOVIES] = (state, action) => {
  const { movies, } = action;
  return {
    ...state,
    movies,
  };
};

export default handleActions(handler, initialState);
