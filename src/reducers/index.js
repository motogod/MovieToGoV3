import { combineReducers } from 'redux';
import MovieListReducer from './MovieListReducer';
import TheaterListReducer from './TheaterListReducer';
import MoreListReducer from './MoreListReducer';

export default combineReducers({
  MovieListRedux: MovieListReducer,
  TheaterListRedux: TheaterListReducer,
  MoreListRedux: MoreListReducer
});
