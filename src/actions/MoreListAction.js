import { serverData } from '../api/ApiData';
import { 
  BUY_TICKETS_LINKING
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
