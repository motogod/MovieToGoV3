import MoreScreen from '../../components/More/MoreScreen';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const MoreStack = createStackNavigator({
  MoreScreen: {
    screen: MoreScreen,
  },
},
{
  initialRouteName: 'MoreScreen',
  headerMode: 'screen',
  headerLayoutPreset: 'center'
}
);

export default createAppContainer(MoreStack);
