import { serverData } from '../api/ApiData';
import { 
  BUY_TICKETS_LINKING,
  SEND_SEARCH_FORM,
  DEFAULT_SEND_SEARCH_FORM,
  SEARCH_TIME_REQUEST,
  SEARCH_TIME,
  MOVIE_STYLE_REQUEST,
  MOVIE_STYLE,
  TICKET_REQUEST,
  TICKET_OF_THEATER,
  TICKET_INFORMATION,
  REQUEST_SEARCH_SINGLE_MOVIE_TIME,
  SEND_SINGLE_SEARCH_FORM,
  SEARCH_SINGLE_MOVIE_TIME,
  DEFAULT_SEND_SINGLE_SEARCH_FORM
} from './types';

export const fetchBuyTickets = () => {
    console.log('fetchBuyTickets start=>');
  return (dispatch) => {
    fetch(`${serverData.serverUrl}api/buyTickets`)
      .then(response => response.json())
      .then(responseData => {
          console.log('fetchBuyTickets =>', responseData);
        dispatch({ type: BUY_TICKETS_LINKING, buyTheaterTickets: responseData.buyTheaterTickets });
      })
      .catch((error) => console.log(error)); 
  };
};

// 儲存使用者選取的搜尋條件到 Reducer
export const sendSearchForm = (selectedCnCity, selectedEnCity, firstSliderValue, secondSliderValue) => {
  return (dispatch) => {
    dispatch({ 
      type: SEND_SEARCH_FORM, 
      selectedCnCity,
      selectedEnCity, 
      firstSliderValue,
      secondSliderValue
    });
  };
};

// 重置 儲存使用者選取的搜尋條件到 Reducer
export const defaultSendSearchForm = () => {
  return (dispatch) => {
    dispatch({ type: DEFAULT_SEND_SEARCH_FORM });
  };
};

// 儲存使用者選取的搜尋條件到 Reducer (針對單一電影)
export const sendSingleSearchForm = (selectedSingleCnCity, selectedSingleEnCity, firstSingleSliderValue, secondSingleSliderValue) => {
  return (dispatch) => {
    dispatch({ 
      type: SEND_SINGLE_SEARCH_FORM, 
      selectedSingleCnCity,
      selectedSingleEnCity, 
      firstSingleSliderValue,
      secondSingleSliderValue
    });
  };
};

// 重置 儲存使用者選取的搜尋條件到 Reducer (針對單一電影)
export const defaultSendSingleSearchForm = () => {
  return (dispatch) => {
    dispatch({ type: DEFAULT_SEND_SINGLE_SEARCH_FORM });
  };
};

// 搜尋區域內所有電影
export const fetchSearchTime = (selectedEnCity, firstSliderValue, secondSliderValue) => {
  return (dispatch) => {
    dispatch({ 
      type: SEARCH_TIME_REQUEST, 
      searchAllMovieTimeLoading: true,
      searchAllMovieTime: []
    });
    console.log('url', `${serverData.serverUrl}api/getCloseTime?city=${selectedEnCity}&sTime=${firstSliderValue}&eTime=${secondSliderValue}`);
    fetch(`${serverData.serverUrl}api/getCloseTime?city=${selectedEnCity}&sTime=${firstSliderValue}&eTime=${secondSliderValue}`)
      .then(response => response.json())
      .then(responseData => {
        const movieData = responseData.reduce((r, s) => {
          r.push({ title: s.theaterCn, id: s._id, data: s.movie });
          return r;
        }, []);
        dispatch({ 
          type: SEARCH_TIME, 
          searchAllMovieTimeLoading: false,
          searchAllMovieTime: movieData 
        });
      })
      .catch((error) => console.log(error));   
    };  
};

// 搜尋單一電影所有時間
export const fetchSingleMovieTime = (selectedCity, firstSliderValue, secondSliderValue, cnName) => {
  return (dispatch) => {
    console.log('why');
    dispatch({ 
      type: REQUEST_SEARCH_SINGLE_MOVIE_TIME,       
      searchSingleMovieTimeLoading: true,
      searchSingleMovieTime: [] 
    });
    console.log('url', `${serverData.serverUrl}api/getNameCloseTime?city=${selectedCity}&sTime=${firstSliderValue}&eTime=${secondSliderValue}&cnName=${cnName}`);
    fetch(`${serverData.serverUrl}api/getNameCloseTime?city=${selectedCity}&sTime=${firstSliderValue}&eTime=${secondSliderValue}&cnName=${cnName}`)
      .then(response => response.json())
      .then(responseData => {
        console.log('responseData', responseData);
        const movieData = responseData.reduce((r, s) => {
          r.push({ title: s.theaterCn, id: s._id, data: s.movie });
          return r;
        }, []);

        dispatch({ 
          type: SEARCH_SINGLE_MOVIE_TIME,           
          searchSingleMovieTimeLoading: false,
          searchSingleMovieTime: movieData  
        });
      })
      .catch((error) => console.log(error));   
    }; 
};

// 查詢電影分類
export const fetchMovieStyle = (url) => {
  return (dispatch) => {
    dispatch({ type: MOVIE_STYLE_REQUEST, movieStyleLoading: true, movieStyleList: [] });
    
    fetch(url)
      .then(response => response.json())
      .then(responseData => {
        
        dispatch({ type: MOVIE_STYLE, movieStyleLoading: false, movieStyleList: responseData });
      })
      .catch((error) => console.log(error));
  };
};

// 取得票價資訊的戲院清單
export const getTheaterListWithTicket = (ticketZone) => {
  return (dispatch) => {
    // dispatch({ type: TICKET_REQUEST });
    
    fetch(`${serverData.serverUrl}api/getTicketsOfTheater?theaterZone=${ticketZone}`)
      .then(response => response.json())
      .then(responseData => {
        dispatch({ type: TICKET_OF_THEATER, ticketTheater: responseData });
      })
      .catch((error) => console.log(error));    
    };  
};
// 取得單獨戲院的票價資訊
export const getTicketInformation = (ticketZone, theaterCn) => {
  return (dispatch) => {
    // dispatch({ type: TICKET_REQUEST });
    console.log('getTicketInformation url', `${serverData.serverUrl}api/getTickets?theaterZone=${ticketZone}&theaterCn=${theaterCn}`);
    fetch(`${serverData.serverUrl}api/getTickets?theaterZone=${ticketZone}&theaterCn=${theaterCn}`)
      .then(response => response.json())
      .then(responseData => {
        dispatch({ type: TICKET_INFORMATION, ticketInformation: responseData[0] });
      })
      .catch((error) => console.log(error));    
    };  
};
