import { createStackNavigator, createAppContainer } from 'react-navigation';
import TheaterScreen from '../../components/Theater/TheaterScreen';
import LocalTheaterScreen from '../../components/Theater/LocalTheaterScreen';

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
    screen: LocalTheaterScreen,
    navigationOptions: () => ({
      headerBackTitle: null,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: commonColor.headerColor, 
        elevation: null
      }
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
