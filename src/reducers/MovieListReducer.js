import { 
  MOVIELIST_RANKING,
  REQUEST_MOVIELIST_NEWS,
  MOVIELIST_NEWS,
  MOVIELIST_TODAY,
  MOVIELIST_TODAY_V2,
  REQUEST_MOVIELIST_THISWEEK,
  MOVIELIST_THISWEEK,
  MOVIELIST_RECENT_MOVIE,
  REQUEST_MOVIE_DETAIL,
  MOVIE_DETAIL,
  PERSIST_MOVIE_DETAIL,
  FETCH_POPULAR_TV,
  FETCH_TV_DETAIL,
  FETCH_TV_VIDEO_ID,
  FETCH_TV_ACTOR_STILLS,
  FETCH_TV_STILLS,
  DEFAULT_FETCH_TV_REDUCER
} from '../actions/types';
// asyncData : 判斷收藏 ICON 為已收藏或未收藏
const INITIAL_STATE = {
  todayMovie: [],
  searchMovie: [],
  ranking: [],
  movieNews: [],
  thisWeek: [],
  thisWeekLoading: true,
  recentMovie: [],
  popularTv: [],
  tvDetail: {},
  tvVideoId: [],
  tvActorStills: [],
  tvStills: [],
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
    case REQUEST_MOVIELIST_NEWS:
      return {
        ...state,
        movieNewsLoading: action.movieNewsLoading,
        movieNews: action.movieNews
      };
    case MOVIELIST_NEWS:
      return {
        ...state,
        movieNewsLoading: action.movieNewsLoading,
        movieNews: action.movieNews
      };
    case MOVIELIST_TODAY:
      return {
        ...state,
        todayMovie: action.todayMovie
      };
    case MOVIELIST_TODAY_V2:
      return {
        ...state,
        searchMovie: action.searchMovie
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
    case FETCH_POPULAR_TV:
      return {
        ...state,
        popularTv: action.popularTv
      };
    case FETCH_TV_DETAIL:
      return {
        ...state,
        tvDetail: action.tvDetail
      };
    case FETCH_TV_VIDEO_ID:
      return {
        ...state,
        tvVideoId: action.tvVideoId
      };
    case FETCH_TV_ACTOR_STILLS: {
      return {
        ...state,
        tvActorStills: action.tvActorStills
      };
    }
    case FETCH_TV_STILLS: {
      return {
        ...state,
        tvStills: action.tvStills
      };
    }
    case DEFAULT_FETCH_TV_REDUCER: {
      return {
        ...state,
        tvDetail: {},
        tvVideoId: [],
        tvActorStills: [],
        tvStills: []
      };
    }
    default:
      return state;
  }
};
