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
  PERSIST_MOVIE_DETAIL,
  FETCH_POPULAR_TV,
  FETCH_TV_DETAIL,
  FETCH_TV_VIDEO_ID,
  FETCH_TV_STILLS,
  FETCH_TV_ACTOR_STILLS,
  DEFAULT_FETCH_TV_REDUCER
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
// 取得最近有新級數上映的影集
export const fetchPopularTv = () => {
  return (dispatch) => {
    fetch(`${serverData.theMovieDb}tv/on_the_air?api_key=${serverData.theMovieDbApiKey}&language=zh-TW&page=1`)
      .then(response => response.json())
      .then(responseData => {
        console.log('fetchPopularTv responseData', responseData);
        dispatch({ type: FETCH_POPULAR_TV, popularTv: responseData.results });
      })
      .catch((error) => console.log(error));  
  };
};

export const fetchTvDetail = (id) => {
  return (dispatch) => {
    // 透過影集的 id 來取得影集內容
    fetch(`${serverData.theMovieDb}tv/${id}?api_key=${serverData.theMovieDbApiKey}&language=zh-TW`)
      .then(response => response.json())
      .then(responseData => {
        // console.log('fetchTvDetail responseData', responseData);
        dispatch({ type: FETCH_TV_DETAIL, tvDetail: responseData });

        // 透過最新集數的 show_id 來取得演員的圖片跟名字
        const showId = responseData.next_episode_to_air.show_id;

        fetch(`${serverData.theMovieDb}tv/${showId}/credits?api_key=${serverData.theMovieDbApiKey}&language=zh-TW`)
        .then(response => response.json())
        .then(responseData => {
          // console.log('fetchActorStills responseData', responseData);
          dispatch({ type: FETCH_TV_ACTOR_STILLS, tvActorStills: responseData.cast });
  
          // 透過最新集數的 show_id 來取得演員的圖片跟名字
        })
        .catch((error) => console.log(error));  

      })
      .catch((error) => console.log(error));  
    // 透過影集的 id 來取得 Youtube的影片 id
    fetch(`${serverData.theMovieDb}tv/${id}/videos?api_key=${serverData.theMovieDbApiKey}`)
      .then(response => response.json())
      .then(responseData => {
        // console.log('fetchTvVideoId responseData', responseData);
        dispatch({ type: FETCH_TV_VIDEO_ID, tvVideoId: responseData.results });
      })
      .catch((error) => console.log(error)); 
    // 透過影集的 id 來取得 Youtube的影片 id
    fetch(`${serverData.theMovieDb}tv/${id}/images?api_key=${serverData.theMovieDbApiKey}`)
      .then(response => response.json())
      .then(responseData => {
        // console.log('fetchTvStills responseData', responseData);
        dispatch({ type: FETCH_TV_STILLS, tvStills: responseData.backdrops });
      })
      .catch((error) => console.log(error)); 
  };  
};

// 取得最近有新級數上映的影集
export const defaultTvReducer = () => {
  return (dispatch) => {
    dispatch({ type: DEFAULT_FETCH_TV_REDUCER });
  };
};
