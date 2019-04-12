import { createStackNavigator, createAppContainer } from 'react-navigation';
import MoreScreen from '../../components/More/MoreScreen';
import BuyTicketsTheaterScreen from '../../components/More/BuyTicketsTheaterScreen';
import TheaterTicketWebScreen from '../../components/More/TheaterTicketWebScreen';

const MoreStack = createStackNavigator({
  MoreScreen: {
    screen: MoreScreen,
    navigationOptions: () => ({
      header: null,
      headerBackTitle: null
    })
  },
  BuyTicketsTheaterScreen: {
    screen: BuyTicketsTheaterScreen
  },
  TheaterTicketWebScreen: {
    screen: TheaterTicketWebScreen
  }
},
{
  initialRouteName: 'MoreScreen',
  headerMode: 'screen',
  headerLayoutPreset: 'center'
}
);

export default createAppContainer(MoreStack);
