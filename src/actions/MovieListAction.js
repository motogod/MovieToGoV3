import { serverData } from '../api/ApiData';
import { 
  MOVIELIST_RANKING,
  MOVIELIST_TODAY,
  REQUEST_MOVIELIST_THISWEEK, 
  MOVIELIST_THISWEEK,
  MOVIELIST_RECENT_MOVIE
} from './types';

export const fetchRanking = () => {
  return (dispatch) => {
    fetch(`${serverData.serverUrl}api/getTwRanking`)
      .then(response => response.json())
      .then(responseData => {
        dispatch({ type: MOVIELIST_RANKING, ranking: responseData[0].movie });
      })
      .catch((error) => console.log(error));  
  };
};

export const fetchTodayMovieList = () => {
  return (dispatch) => {
    fetch(`${serverData.serverUrl}api/todayMovie`)
    .then(response => response.json())
    .then(responseData => {
      dispatch({ type: MOVIELIST_TODAY, todayMovie: responseData[0].movie });
    })
    .catch((error) => console.log(error));
  };
};

export const fetchThisWeek = () => {
  return (dispatch) => {
    dispatch({ 
      type: REQUEST_MOVIELIST_THISWEEK, 
      thisWeek: [],
      thisWeekLoading: true
     });

    fetch(`${serverData.serverUrl}api/thisWeek`)
      .then(response => response.json())
      .then(responseData => {
        dispatch({ 
          type: MOVIELIST_THISWEEK, 
          thisWeek: responseData[0].movie, 
          thisWeekLoading: false 
        });
      })
      .catch((error) => console.log(error));    
  };
};

export const fetchRecentMovie = () => {
  return (dispatch) => {
    // dispatch({ 
    //   type: REQUEST_MOVIELIST_THISWEEK, 
    //   thisWeek: [],
    //   thisWeekLoading: true
    //  });

    fetch(`${serverData.serverUrl}api/recentMovie`)
      .then(response => response.json())
      .then(responseData => {
        console.log('responseData =>', responseData);
        dispatch({ 
          type: MOVIELIST_RECENT_MOVIE, 
          recentMovie: responseData
        });
      })
      .catch((error) => console.log(error));    
  };
};
