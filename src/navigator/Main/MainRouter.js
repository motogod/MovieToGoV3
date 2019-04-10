import React from 'react';
import { Image } from 'react-native';
import { 
  createStackNavigator, 
  createBottomTabNavigator, 
  createAppContainer, 
  createDrawerNavigator 
} from 'react-navigation';
// Screen
import MainScreen from '../../components/Main/MainScreen';
import RankingScreen from '../../components/Main/RankingScreen';
import DrawerPanelScreen from '../../components/Drawer/DrawerPanelScreen';
// Router
import TheaterRouter from '../Theater/TheaterRouter';
import SearchRouter from '../Search/SearchRouter';
import MoreRouter from '../More/MoreRouter';

import I18n from '../../i18n/i18n';
import { commonColor } from '../../components/Shared/Data/Color';

import HomeIcon from '../../assets/img/home.png';
import TheaterIcon from '../../assets/img/theater.png';
import SearchIcon from '../../assets/img/search.png';
import MoreIcon from '../../assets/img/more.png';

const MainStack = createStackNavigator({
  MainScreen: {
    screen: MainScreen,
    navigationOptions: () => ({
      header: null
    })
  },
  RankingScreen: {
    screen: RankingScreen
  },
},
{
  initialRouteName: 'MainScreen',
  headerMode: 'screen',
  headerLayoutPreset: 'center'
}
);

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: MainStack,
    path: '/',
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        return <Image source={HomeIcon} style={{ width: 24, height: 24, tintColor }} />;
      },
      tabBarLabel: I18n.t('HOME')
    },
  },
  Theater: {
    screen: TheaterRouter,
    path: '/',
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        return <Image source={TheaterIcon} style={{ width: 24, height: 24, tintColor }} />;
      },
      tabBarLabel: I18n.t('THEATER')
    },
  },
  Search: {
    screen: SearchRouter,
    path: '/',
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        return <Image source={SearchIcon} style={{ width: 24, height: 24, tintColor }} />;
      },
      tabBarLabel: I18n.t('SEARCH')
    },
  },
  More: {
    screen: MoreRouter,
    path: '/',
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        return <Image source={MoreIcon} style={{ width: 24, height: 24, tintColor }} />;
      },
      tabBarLabel: I18n.t('MORE')
    },
  },
},
{
  tabBarOptions: {
    showLabel: false,
    activeTintColor: 'blue',
    inactiveTintColor: commonColor.headerColor,
  },
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
