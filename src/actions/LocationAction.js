import { 
  SAVE_LNG_LAT
} from './types';

export const saveLocation = ({ lng, lat }) => {
  return (dispatch) => {
    dispatch({ type: SAVE_LNG_LAT, lng, lat });
  };
};
