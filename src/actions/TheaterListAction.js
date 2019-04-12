import { serverData } from '../api/ApiData';
import { 
  REQUEST_THEATER,
  MOVIELIST_THEATER,
  MOVIELIST_THEATER_TIME
} from './types';

// 讀取戲院清單
export const fetchTheater = ({ enCity, lng, lat }) => {
  return (dispatch) => {
    dispatch({ type: REQUEST_THEATER, theaterLoading: true });
    // if there is no lng and lat from device
    if (lng === '' || lat === '') {
        fetch(`${serverData.serverUrl}api/drivers?city=${enCity}&lng=121.514163&lat=25.049447`)
          .then(response => response.json())
          .then(responseData => {
            dispatch({ type: MOVIELIST_THEATER, theaterLoading: false, theaterList: responseData });
          })
          .catch((error) => console.log(error)); 
    } else {
        fetch(`${serverData.serverUrl}api/drivers?city=${enCity}&lng=${lng}&lat=${lat}`)
          .then(response => response.json())
          .then(responseData => {
            dispatch({ type: MOVIELIST_THEATER, theaterLoading: false, theaterList: responseData });
          })
          .catch((error) => console.log(error));    
    }
  };
};

// 讀取單一戲院的電影資料
export const fetchTime = (enCity, theater) => {
  return (dispatch) => {
    fetch(`${serverData.serverUrl}api?city=${enCity}&theater=${theater}`)
      .then(response => response.json())
      .then(responseData => {
        dispatch({ type: MOVIELIST_THEATER_TIME, theaterMovieTime: responseData[0].movie });
      })
      .catch((error) => console.log(error));    
  };
};
