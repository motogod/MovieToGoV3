import React, { Component } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
// Scroll tab screen
import RankingScreen from './RankingScreen';
import MovieNews from './MovieNews';
import TodayMovieScreen from './TodayMovieScreen';
import ThisWeekScreen from './ThisWeekScreen';
import RecentMovieScreen from './RecentMovieScreen';

import I18n from '../../i18n/i18n';
import { commonColor } from '../Shared/Data/Color';

class MainScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerBackTitle: null,
      headerLeft:
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Text>flgosgjag</Text>
      </TouchableOpacity>,
      headerTitleStyle: {
        fontSize: 18
      }
    };
  };

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: commonColor.headerColor }}>
        <ScrollableTabView
          initialPage={0}
          tabBarUnderlineStyle={{ backgroundColor: 'yellow', height: 1 }}
          tabBarActiveTextColor={'yellow'}
          tabBarInactiveTextColor={'#fff'}
          renderTabBar={() => 
            <ScrollableTabBar 
              style={{ backgroundColor: commonColor.headerColor }} 
            />}
        >
          <RankingScreen navigation={navigation} tabLabel={I18n.t('RANKING')} />
          <MovieNews navigation={navigation} tabLabel={I18n.t('MOVIE_NEWS')} />
          <TodayMovieScreen navigation={navigation} tabLabel={I18n.t('TODAY_MOVIE')} />
          <ThisWeekScreen navigation={navigation} tabLabel={I18n.t('THIS_WEEK')} />
          <RecentMovieScreen navigation={navigation} tabLabel={I18n.t('RECENT')} />
        </ScrollableTabView>
      </SafeAreaView>
    );
  }
}

export default connect(null, {})(MainScreen);
