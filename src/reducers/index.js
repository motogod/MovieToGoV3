import { combineReducers } from 'redux';
import MovieListReducer from './MovieListReducer';

export default combineReducers({
  MovieListRedux: MovieListReducer
});
