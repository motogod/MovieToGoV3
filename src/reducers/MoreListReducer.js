import { 
  BUY_TICKETS_LINKING,
  SEND_SEARCH_FORM,
  DEFAULT_SEND_SEARCH_FORM
} from '../actions/types';
      
const INITIAL_STATE = {
  buyTheaterTickets: [],
  selectedCnCity: '',
  selectedEnCity: '',
  firstSliderValue: 0,
  secondSliderValue: 24
};
  
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BUY_TICKETS_LINKING:
      return {
        ...state,
        buyTheaterTickets: action.buyTheaterTickets
      };
    case SEND_SEARCH_FORM:
      return {
        ...state,
        selectedCnCity: action.selectedCnCity,
        selectedEnCity: action.selectedEnCity,
        firstSliderValue: action.firstSliderValue,
        secondSliderValue: action.secondSliderValue,
      };
    case DEFAULT_SEND_SEARCH_FORM:
      return {
        ...state,
        selectedCnCity: '',
        selectedEnCity: '',
        firstSliderValue: 0,
        secondSliderValue: 24
      };
    default:
      return state;
  }
};
