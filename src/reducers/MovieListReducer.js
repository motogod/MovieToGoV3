import { 
  MOVIELIST_RANKING,
  MOVIELIST_TODAY,
  REQUEST_MOVIELIST_THISWEEK,
  MOVIELIST_THISWEEK,
  MOVIELIST_RECENT_MOVIE
} from '../actions/types';
// asyncData : 判斷收藏 ICON 為已收藏或未收藏
const INITIAL_STATE = {
  todayMovie: [],
  ranking: [],
  thisWeek: [],
  thisWeekLoading: false,
  recentMovie: [],
  timeList: [],
  movieDetail: [],
  asyncData: [],
  loading: true,
  asyncMovieData: [],
  asyncMovieLoading: true,
  firstBootUp: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MOVIELIST_RANKING:
      return {
        ...state,
        ranking: action.ranking
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
    default:
      return state;
  }
};
