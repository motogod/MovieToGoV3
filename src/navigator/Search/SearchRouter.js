import { createStackNavigator, createAppContainer } from 'react-navigation';
import SearchScreen from '../../components/Search/SearchScreen';
// GeneralComponent
import MovieDetail from '../../components/GeneralComponent/MovieDetail';

const SearchStack = createStackNavigator({
  SearchScreen: {
    screen: SearchScreen,
    navigationOptions: () => ({
      header: null
    })
  },
  MovieDetail: {
    screen: MovieDetail
  }
},
{
  initialRouteName: 'SearchScreen',
  headerMode: 'screen',
  headerLayoutPreset: 'center'
}
);

export default createAppContainer(SearchStack);
