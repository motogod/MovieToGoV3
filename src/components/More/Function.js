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