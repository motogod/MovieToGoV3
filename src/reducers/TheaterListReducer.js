// MOVIELIST_THEATER
import { 
  MOVIELIST_THEATER,
} from '../actions/types';
    
const INITIAL_STATE = {
  theaterList: [],
  releasedTheater: [],
  loading: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MOVIELIST_THEATER:
      return {
        ...state,
        theaterList: action.payload,
        loading: false 
      };
    default:
      return state;
  }
};
