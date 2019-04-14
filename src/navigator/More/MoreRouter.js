import { createStackNavigator, createAppContainer } from 'react-navigation';
import MoreScreen from '../../components/More/MoreScreen';
import SearchMovieTimeScreen from '../../components/More/SearchMovieTimeScreen';
import SearchResultScreen from '../../components/More/SearchResultScreen';
import BuyTicketsTheaterScreen from '../../components/More/BuyTicketsTheaterScreen';
import TheaterTicketWebScreen from '../../components/More/TheaterTicketWebScreen';
// GeneralComponent screen
import MovieDetail from '../../components/GeneralComponent/MovieDetail';
import PttWebScreen from '../../components/GeneralComponent/PttWebScreen';

const MoreStack = createStackNavigator({
  MoreScreen: {
    screen: MoreScreen,
    navigationOptions: () => ({
      header: null,
      headerBackTitle: null
    })
  },
  SearchMovieTimeScreen: {
    screen: SearchMovieTimeScreen
  },
  SearchResultScreen: {
    screen: SearchResultScreen
  },
  BuyTicketsTheaterScreen: {
    screen: BuyTicketsTheaterScreen
  },
  TheaterTicketWebScreen: {
    screen: TheaterTicketWebScreen
  },
  MovieDetail: {
    screen: MovieDetail
  },
  PttWebScreen: {
    screen: PttWebScreen
  }
},
{
  initialRouteName: 'MoreScreen',
  headerMode: 'screen',
  headerLayoutPreset: 'center'
}
);

export default createAppContainer(MoreStack);
