import { 
  BUY_TICKETS_LINKING
} from '../actions/types';
      
const INITIAL_STATE = {
  buyTheaterTickets: []
};
  
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BUY_TICKETS_LINKING:
      return {
        ...state,
        buyTheaterTickets: action.buyTheaterTickets
      };
      default:
        return state;
  }
};
