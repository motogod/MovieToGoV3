import MainScreen from '../../components/Main/MainScreen';
import DrawerPanelScreen from '../../components/Drawer/DrawerPanelScreen';
// import MoreScreen from '../../components/More/MoreScreen';
import MoreRouter from '../More/MoreRouter';
import { createStackNavigator, createBottomTabNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';

const MainStack = createStackNavigator({
    MainScreen: {
    screen: MainScreen,
  },
},
{
  initialRouteName: 'MainScreen',
  headerMode: 'screen',
  headerLayoutPreset: 'center'
}
);

const TabNavigator = createBottomTabNavigator({
  Home: MainStack,
  More: MoreRouter,
});
  
const Router = createDrawerNavigator({
  FirstScreen: {
    screen: TabNavigator
  }
},
{
  contentComponent: DrawerPanelScreen,
  drawerWidth: 200
});
    
  
export default createAppContainer(Router);
