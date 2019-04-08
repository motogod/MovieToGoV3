import { MOVIELIST_THISWEEK } from './types';

export const fetchThisWeek = () => {
return (dispatch) => {
  fetch('https://obscure-reaches-65656.herokuapp.com/api/thisWeek')
    .then(response => response.json())
    .then(responseData => {
      dispatch({ type: MOVIELIST_THISWEEK, payload: responseData[0].movie });
    })
    .catch((error) => console.log(error));    
  };
};
