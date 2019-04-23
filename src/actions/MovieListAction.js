import _ from 'lodash';
import { serverData } from '../api/ApiData';
import { 
  MOVIELIST_RANKING,
  REQUEST_MOVIELIST_NEWS,
  MOVIELIST_NEWS,
  MOVIELIST_TODAY,
  MOVIELIST_TODAY_V2,
  REQUEST_MOVIELIST_THISWEEK, 
  MOVIELIST_THISWEEK,
  MOVIELIST_RECENT_MOVIE,
  REQUEST_MOVIE_DETAIL,
  MOVIE_DETAIL,
  PERSIST_MOVIE_DETAIL
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

export const fetchMovieNews = () => {
  return (dispatch) => {
    dispatch({ type: REQUEST_MOVIELIST_NEWS, movieNewsLoading: true, movieNews: [] });

    fetch(serverData.wowNewsUrl)
      .then(response => response.json())
      .then(responseData => {
        dispatch({ type: MOVIELIST_NEWS, movieNewsLoading: false, movieNews: responseData.results });
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
// V2 API 資料量更多 提供給 SearchScreen 使用
export const fetchTodayMovieListV2 = () => {
  return (dispatch) => {
    fetch(`${serverData.serverUrl}api/todayMovieV2`)
    .then(response => response.json())
    .then(responseData => {
      dispatch({ type: MOVIELIST_TODAY_V2, searchMovie: responseData[0].movie });
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

export const fetchDetail = (enCity, cnName) => {
  return (dispatch) => {
    dispatch({ type: REQUEST_MOVIE_DETAIL, movieDetail: [], movieDetailLoading: true });

    fetch(`${serverData.serverUrl}api/detail?city=${enCity}&movie=${cnName}`)
      .then(response => response.json())
      .then(responseData => {
        console.log('what is my responseData', responseData);
        dispatch({ type: MOVIE_DETAIL, movieDetail: responseData[0].movie[0], movieDetailLoading: false });
      })
      .catch((error) => console.log(error));    
  };
};

export const saveDetail = (saveMovieDetail, movieDetail) => {
  return (dispatch) => {
    if (saveMovieDetail.length > 0) {
      // 收藏的電影名單裡面至少有一筆資料
      // 以中文名字判斷是否之前有存入 有則回傳 index的值 沒有資料回傳 -1
      const cnNameIndex = _.findIndex(saveMovieDetail, (value) => { return value.cnName === movieDetail.cnName; });
        if (cnNameIndex === -1) {
          dispatch({ type: PERSIST_MOVIE_DETAIL, saveMovieDetail: saveMovieDetail.concat(movieDetail) });
        } else {
          // 否則已經有資料，無需再存入
        }     
    } else {
      // 珍藏名單是空白的，直接存入
      dispatch({ type: PERSIST_MOVIE_DETAIL, saveMovieDetail: [movieDetail] });
    }
  };
};

export const deleteDetail = (saveMovieDetail, movieDetail) => {
  return (dispatch) => {
    // 有則回傳 index的值 沒有回傳 -1
    const cnNameIndex = _.findIndex(saveMovieDetail, (value) => { return value.cnName === movieDetail.cnName; });
      if (cnNameIndex > -1) {
        const removeElements = _.remove(saveMovieDetail, (value) => { return value.cnName !== movieDetail.cnName; });
        // 資料有可能剛好刪完，將刪除後的新資料也放入 saveMovieDetail removeElements 則為空陣列
        if (removeElements.length === 0) {
          dispatch({ type: PERSIST_MOVIE_DETAIL, saveMovieDetail: removeElements });
          return;
        }
        // 將新的 Array (已移除掉使用者選擇要刪除的影片)
        dispatch({ type: PERSIST_MOVIE_DETAIL, saveMovieDetail: removeElements });
      } else {
        // 無資料，不需做刪除動作
      }
  };
};
