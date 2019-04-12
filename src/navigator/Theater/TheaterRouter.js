import { createStackNavigator, createAppContainer } from 'react-navigation';
import TheaterScreen from '../../components/Theater/TheaterScreen';
import LocalTheaterScreen from '../../components/Theater/LocalTheaterScreen';
import TheaterMovieTimeScreen from '../../components/Theater/TheaterMovieTimeScreen';
// GeneralComponent screen
import MovieDetail from '../../components/GeneralComponent/MovieDetail';

import { commonColor } from '../../components/Shared/Data/Color';

const TheaterStack = createStackNavigator({
  TheaterScreen: {
    screen: TheaterScreen,
    navigationOptions: () => ({
      header: null,
      headerBackTitle: null
    })
  },
  LocalTheaterScreen: {
    screen: LocalTheaterScreen
  },
  TheaterMovieTimeScreen: {
    screen: TheaterMovieTimeScreen
  },
  MovieDetail: {
    screen: MovieDetail
  }
},
{
  initialRouteName: 'TheaterScreen',
  headerMode: 'screen',
  headerLayoutPreset: 'center'
}
);

export default createAppContainer(TheaterStack);
