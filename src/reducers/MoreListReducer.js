import { 
  BUY_TICKETS_LINKING,
  SEND_SEARCH_FORM,
  DEFAULT_SEND_SEARCH_FORM,
  SEARCH_TIME_REQUEST,
  SEARCH_TIME,
  MOVIE_STYLE_REQUEST,
  MOVIE_STYLE,
  TICKET_OF_THEATER,
  TICKET_INFORMATION,
  SEND_SINGLE_SEARCH_FORM,
  REQUEST_SEARCH_SINGLE_MOVIE_TIME,
  SEARCH_SINGLE_MOVIE_TIME,
  DEFAULT_SEND_SINGLE_SEARCH_FORM
} from '../actions/types';
      
const INITIAL_STATE = {
  buyTheaterTickets: [],
  selectedCnCity: '',
  selectedEnCity: '',
  firstSliderValue: 0,
  secondSliderValue: 24,
  selectedSingleCnCity: '',
  selectedSingleEnCity: '',
  firstSingleSliderValue: 0,
  secondSingleSliderValue: 24,
  searchAllMovieTimeLoading: true,
  searchAllMovieTime: [],
  searchSingleMovieTimeLoading: true,
  searchSingleMovieTime: [],
  movieStyleLoading: false, 
  movieStyleList: [],
  ticketTheater: [],
  ticketInformation: []
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
    case SEARCH_TIME_REQUEST:
      return {
        ...state,
        searchAllMovieTimeLoading: action.searchAllMovieTimeLoading,
        searchAllMovieTime: action.searchAllMovieTime
      };
    case SEARCH_TIME: 
      return {
        ...state,
        searchAllMovieTimeLoading: action.searchAllMovieTimeLoading,
        searchAllMovieTime: action.searchAllMovieTime        
      };
    case MOVIE_STYLE_REQUEST:
      return {
        ...state,
        movieStyleLoading: action.movieStyleLoading, 
        movieStyleList: action.movieStyleList
      };
    case MOVIE_STYLE:
      return {
        ...state,
        movieStyleLoading: action.movieStyleLoading, 
        movieStyleList: action.movieStyleList        
      };
    case TICKET_OF_THEATER:
      return {
        ...state,
        ticketTheater: action.ticketTheater
      };
    case TICKET_INFORMATION:
      return {
        ...state,
        ticketInformation: action.ticketInformation
      };
    case SEND_SINGLE_SEARCH_FORM:
      return {
        ...state,
        selectedSingleCnCity: action.selectedSingleCnCity,
        selectedSingleEnCity: action.selectedSingleEnCity,
        firstSingleSliderValue: action.firstSingleSliderValue,
        secondSingleSliderValue: action.secondSingleSliderValue,
      };
    case DEFAULT_SEND_SINGLE_SEARCH_FORM:
      return {
        ...state,
        selectedSingleCnCity: '',
        selectedSingleEnCity: '',
        firstSingleSliderValue: 0,
        secondSingleSliderValue: 24,
      };
    case REQUEST_SEARCH_SINGLE_MOVIE_TIME: {
      return {
        ...state,
        searchSingleMovieTimeLoading: action.searchSingleMovieTimeLoading,
        searchSingleMovieTime: action.searchSingleMovieTime
      };
    }
    case SEARCH_SINGLE_MOVIE_TIME: {
      return {
        ...state,
        searchSingleMovieTimeLoading: action.searchSingleMovieTimeLoading,
        searchSingleMovieTime: action.searchSingleMovieTime        
      };
    }
    default:
      return state;
  }
};
