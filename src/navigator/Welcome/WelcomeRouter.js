import { createStackNavigator, createAppContainer } from 'react-navigation';
import WelcomeScreen from '../../components/Welcome/WelcomeScreen';

import MainRouter from '../Main/MainRouter';

const WelcomeStack = createStackNavigator({
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: () => ({
      header: null
    })
  },
  MainScreen: {
    screen: MainRouter,
    navigationOptions: () => ({
      header: null,
      gesturesEnabled: false
    })
  }
},
{
  initialRouteName: 'WelcomeScreen',
  headerMode: 'screen',
  headerLayoutPreset: 'center'
}
);

export default createAppContainer(WelcomeStack);
