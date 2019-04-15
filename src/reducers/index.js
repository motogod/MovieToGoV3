import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import MovieListReducer from './MovieListReducer';
import TheaterListReducer from './TheaterListReducer';
import MoreListReducer from './MoreListReducer';
import LocationReducer from './LocationReducer';

// 儲存 使用者珍藏的電影內容
const persistMovieListConfig = {
  key: 'MovieListRedux',
  storage,
  whitelist: ['saveMovieDetail']
};

const persistTheaterListConfig = {
  key: 'TheaterListRedux',
  storage,
  whitelist: ['']
};
// 儲存使用者在時間查詢點選的條件 selectedCnCity, firstSliderValue, secondSliderValue
const persistMoreListConfig = {
  key: 'MoreListRedux',
  storage,
  whitelist: ['selectedCnCity', 'firstSliderValue', 'secondSliderValue']
};

const locationConfig = {
  key: 'LocationRedux',
  storage,
  whitelist: ['']
};

export default combineReducers({
  MovieListRedux: persistReducer(persistMovieListConfig, MovieListReducer),
  TheaterListRedux: persistReducer(persistTheaterListConfig, TheaterListReducer),
  MoreListRedux: persistReducer(persistMoreListConfig, MoreListReducer),
  LocationRedux: persistReducer(locationConfig, LocationReducer)
});
