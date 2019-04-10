import { createStackNavigator, createAppContainer } from 'react-navigation';
import MoreScreen from '../../components/More/MoreScreen';

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
