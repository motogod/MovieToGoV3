import { createStackNavigator, createAppContainer } from 'react-navigation';
import TheaterScreen from '../../components/Theater/TheaterScreen';

const TheaterStack = createStackNavigator({
  TheaterScreen: {
    screen: TheaterScreen,
    navigationOptions: () => ({
      header: null
    })
  },
},
{
  initialRouteName: 'TheaterScreen',
  headerMode: 'screen',
  headerLayoutPreset: 'center'
}
);

export default createAppContainer(TheaterStack);
