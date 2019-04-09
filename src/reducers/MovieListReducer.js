import { 
  MOVIELIST_RANKING,
  REQUEST_MOVIELIST_THISWEEK,
  MOVIELIST_THISWEEK
} from '../actions/types';
// asyncData : 判斷收藏 ICON 為已收藏或未收藏
const INITIAL_STATE = {
  mainMovie: [],
  ranking: [],
  thisWeek: [],
  thisWeekLoading: false,
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
    default:
      return state;
  }
};
