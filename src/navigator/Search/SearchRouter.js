import { createStackNavigator, createAppContainer } from 'react-navigation';
import SearchScreen from '../../components/Search/SearchScreen';
// GeneralComponent
import MovieDetail from '../../components/GeneralComponent/MovieDetail';
import SearchSingleMovieTimeScreen from '../../components/GeneralComponent/SearchSingleMovieTimeScreen';
import SearchSingleResultScreen from '../../components/GeneralComponent/SearchSingleResultScreen';

const SearchStack = createStackNavigator({
  SearchScreen: {
    screen: SearchScreen,
    navigationOptions: () => ({
      header: null
    })
  },
  MovieDetail: {
    screen: MovieDetail
  },
  SearchSingleMovieTimeScreen: {
    screen: SearchSingleMovieTimeScreen
  },
  SearchSingleResultScreen: {
    screen: SearchSingleResultScreen
  }
},
{
  initialRouteName: 'SearchScreen',
  headerMode: 'screen',
  headerLayoutPreset: 'center'
}
);

export default createAppContainer(SearchStack);
