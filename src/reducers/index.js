import { combineReducers } from 'redux';
import MovieListReducer from './MovieListReducer';
import TheaterListReducer from './TheaterListReducer';

export default combineReducers({
  MovieListRedux: MovieListReducer,
  TheaterListRedux: TheaterListReducer
});
