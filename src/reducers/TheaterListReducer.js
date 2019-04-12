// MOVIELIST_THEATER
import { 
  REQUEST_THEATER,
  MOVIELIST_THEATER,
  MOVIELIST_THEATER_TIME
} from '../actions/types';
    
const INITIAL_STATE = {
  theaterList: [],
  theaterMovieTime: [],
  loading: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_THEATER:
      return {
        ...state,
        theaterLoading: action.theaterLoading
      };
    case MOVIELIST_THEATER:
      return {
        ...state,
        theaterList: action.theaterList,
        theaterLoading: action.theaterLoading 
      };
    case MOVIELIST_THEATER_TIME:
      return {
        ...state,
        theaterMovieTime: action.theaterMovieTime
      };
    default:
      return state;
  }
};
