import { createStackNavigator, createAppContainer } from 'react-navigation';
import SearchScreen from '../../components/Search/SearchScreen';

const SearchStack = createStackNavigator({
  SearchScreen: {
    screen: SearchScreen,
    navigationOptions: () => ({
      header: null
    })
  },
},
{
  initialRouteName: 'SearchScreen',
  headerMode: 'screen',
  headerLayoutPreset: 'center'
}
);

export default createAppContainer(SearchStack);
