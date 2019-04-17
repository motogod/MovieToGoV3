// MOVIELIST_THEATER
import { 
  SAVE_LNG_LAT
} from '../actions/types';
      
const INITIAL_STATE = {
  lat: '',
  lng: ''
};
  
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_LNG_LAT:
      return {
        ...state,
        lng: action.lng,
        lat: action.lat
      };
    default:
      return state;
    }
};
