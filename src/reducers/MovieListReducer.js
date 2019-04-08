import { 
  MOVIELIST_THISWEEK
} from '../actions/types';
// asyncData : 判斷收藏 ICON 為已收藏或未收藏
const INITIAL_STATE = {
  mainMovie: [],
  twRanking: [],
  thisWeek: [],
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
    case MOVIELIST_THISWEEK:
    return {
      ...state,
      thisWeek: action.payload
    };
    default:
      return state;
  }
};
