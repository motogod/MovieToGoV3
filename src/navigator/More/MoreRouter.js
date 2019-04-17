import { createStackNavigator, createAppContainer } from 'react-navigation';
import MoreScreen from '../../components/More/MoreScreen';
import SearchMovieTimeScreen from '../../components/More/SearchMovieTimeScreen';
import SearchResultScreen from '../../components/More/SearchResultScreen';
import MovieTypeSearchScreen from '../../components/More/MovieTypeSearchScreen';
import MovieTypeResultScreen from '../../components/More/MovieTypeResultScreen';
import BuyTicketsTheaterScreen from '../../components/More/BuyTicketsTheaterScreen';
import CashInfoScreen from '../../components/More/CashInfoScreen';
import CashInfoDetailScreen from '../../components/More/CashInfoDetailScreen';
import TheaterTicketWebScreen from '../../components/More/TheaterTicketWebScreen';
import MyCollectionScreen from '../../components/More/MyCollectionScreen';
// GeneralComponent screen
import MovieDetail from '../../components/GeneralComponent/MovieDetail';
import PttWebScreen from '../../components/GeneralComponent/PttWebScreen';
import SearchSingleMovieTimeScreen from '../../components/GeneralComponent/SearchSingleMovieTimeScreen';
import SearchSingleResultScreen from '../../components/GeneralComponent/SearchSingleResultScreen';

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
  MovieTypeSearchScreen: {
    screen: MovieTypeSearchScreen
  },
  MovieTypeResultScreen: {
    screen: MovieTypeResultScreen
  },
  BuyTicketsTheaterScreen: {
    screen: BuyTicketsTheaterScreen
  },
  TheaterTicketWebScreen: {
    screen: TheaterTicketWebScreen
  },
  CashInfoScreen: {
    screen: CashInfoScreen
  },
  CashInfoDetailScreen: {
    screen: CashInfoDetailScreen
  },
  MyCollectionScreen: {
    screen: MyCollectionScreen
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
  initialRouteName: 'MoreScreen',
  headerMode: 'screen',
  headerLayoutPreset: 'center'
}
);

export default createAppContainer(MoreStack);
