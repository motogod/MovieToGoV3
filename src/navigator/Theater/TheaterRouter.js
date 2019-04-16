import { createStackNavigator, createAppContainer } from 'react-navigation';
import TheaterScreen from '../../components/Theater/TheaterScreen';
import LocalTheaterScreen from '../../components/Theater/LocalTheaterScreen';
import TheaterMovieTimeScreen from '../../components/Theater/TheaterMovieTimeScreen';
// GeneralComponent screen
import MovieDetail from '../../components/GeneralComponent/MovieDetail';
import PttWebScreen from '../../components/GeneralComponent/PttWebScreen';
import SearchSingleMovieTimeScreen from '../../components/GeneralComponent/SearchSingleMovieTimeScreen';
import SearchSingleResultScreen from '../../components/GeneralComponent/SearchSingleResultScreen';

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
  },
  PttWebScreen: {
    screen: PttWebScreen
  },
  SearchSingleMovieTimeScreen: {
    screen: SearchSingleMovieTimeScreen
  },
  SearchSingleResultScreen: {
    screen: SearchSingleResultScreen
  }
},
{
  initialRouteName: 'TheaterScreen',
  headerMode: 'screen',
  headerLayoutPreset: 'center'
}
);

export default createAppContainer(TheaterStack);
