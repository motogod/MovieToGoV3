import moment from 'moment-timezone';

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

export const SplitMovieTime = (movieTime) => {
  // 處理字串 片長:02時30分
  if (movieTime !== null && movieTime !== '') {
    const onlyTime = movieTime.split('：');
    return onlyTime[1];
  }

  return movieTime;
};
