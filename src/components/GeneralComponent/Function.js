import _ from 'lodash';
import moment from 'moment-timezone';

export const SplitMovieString = (movieDate) => {
// 處理字串 如 片  長:02時30分
  if (movieDate !== null && movieDate !== '') {
    const onlyTime = movieDate.split('：');
    return onlyTime[1];
  }

  return movieDate;
};
// 判斷IMDB評分資訊有無要顯示的資訊
export const adjustImdbInfo = (imdbScore) => {
  let imdb = '';

  if (imdbScore === 'N/A' || imdbScore === '') {
    imdb = '--';
  } else {
    imdb = imdbScore;
  }

  return imdb;
};
// 判斷ROTTEN評分資訊有無要顯示的資訊
export const adjustRottenInfo = (rottenScore) => {
  let rotten = '';

  if (rottenScore === '') {
    rotten = '--';
  } else {
    rotten = rottenScore;
  }

  return rotten;
};

// 計算 PTT 分數
export const showPTTScore = (goodMinePoint) => {
  let minePoint = 0;

  if (goodMinePoint === 0 || goodMinePoint === 300) {
    minePoint = 0;
  } else if (goodMinePoint > 0 && goodMinePoint < 0.1) {
    minePoint = 0.5;
  } else {
    minePoint = (goodMinePoint * 100) / 20;
  }

  return minePoint;
};

export const checkSaveMovieDataExisted = (saveMovieDetail, movieDetail) => {
  // 有則回傳 index的值 沒有回傳 -1
  const cnNameIndex = _.findIndex(saveMovieDetail, (value) => { 
    return value.cnName === movieDetail.cnName; 
  });

  if (cnNameIndex > -1) {
    return true;
  } 
  // 無資料，不需做刪除動作
  return false;
};

export const GetUserTime = {
  getUserHour: () => {
    return new Date().getHours();
  },
  getAsiaTime: (value, format) => {
    const localTime = moment(value, format).tz('Asia/Taipei').format(format);
    const theTime = new Date(localTime); 
    return theTime;
  }
};
