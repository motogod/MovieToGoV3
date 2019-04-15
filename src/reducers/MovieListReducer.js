import { 
  MOVIELIST_RANKING,
  MOVIELIST_NEWS,
  MOVIELIST_TODAY,
  REQUEST_MOVIELIST_THISWEEK,
  MOVIELIST_THISWEEK,
  MOVIELIST_RECENT_MOVIE,
  REQUEST_MOVIE_DETAIL,
  MOVIE_DETAIL,
  PERSIST_MOVIE_DETAIL
} from '../actions/types';
// asyncData : 判斷收藏 ICON 為已收藏或未收藏
const INITIAL_STATE = {
  todayMovie: [],
  ranking: [],
  movieNews: [],
  thisWeek: [],
  thisWeekLoading: true,
  recentMovie: [],
  timeList: [],
  movieDetailLoading: true,
  movieDetail: [],
  saveMovieDetail: [],
  firstBootUp: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MOVIELIST_RANKING:
      return {
        ...state,
        ranking: action.ranking
      };
    case MOVIELIST_NEWS:
      return {
        ...state,
        movieNews: action.movieNews
      };
    case MOVIELIST_TODAY:
      return {
        ...state,
        todayMovie: action.todayMovie
      };
    case REQUEST_MOVIELIST_THISWEEK:
      return {
        ...state,
        thisWeek: action.thisWeek,
        thisWeekLoading: action.thisWeekLoading
      };
    case MOVIELIST_THISWEEK:
      return {
        ...state,
        thisWeek: action.thisWeek,
        thisWeekLoading: action.thisWeekLoading
      };
    case MOVIELIST_RECENT_MOVIE:
      return {
        ...state,
        recentMovie: action.recentMovie
      };
    case REQUEST_MOVIE_DETAIL:
      return {
        ...state,
        movieDetailLoading: action.movieDetailLoading,
        movieDetail: action.movieDetail
      };
    case MOVIE_DETAIL:
      return {
        ...state,
        movieDetailLoading: action.movieDetailLoading,
        movieDetail: action.movieDetail
      };
    case PERSIST_MOVIE_DETAIL:
      return {
        ...state,
        saveMovieDetail: action.saveMovieDetail
      };
    default:
      return state;
  }
};
