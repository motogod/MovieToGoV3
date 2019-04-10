import { serverData } from '../api/ApiData';
import { 
  MOVIELIST_THEATER,
} from './types';

export const fetchTheater = ({ enCity, lng, lat }) => {
    return (dispatch) => {
      // dispatch({ type: MOVIE_REQUEST_THEATER });
      // if there is no lng and lat from device
      if (lng === '' || lat === '') {
          fetch(`${serverData.serverUrl}api/drivers?city=${enCity}&lng=121.514163&lat=25.049447`)
            .then(response => response.json())
            .then(responseData => {
              dispatch({ type: MOVIELIST_THEATER, payload: responseData });
            })
            .catch((error) => console.log(error)); 
      } else {
          fetch(`${serverData.serverUrl}api/drivers?city=${enCity}&lng=${lng}&lat=${lat}`)
            .then(response => response.json())
            .then(responseData => {
              dispatch({ type: MOVIELIST_THEATER, payload: responseData });
            })
            .catch((error) => console.log(error));    
      }
    };
  };
