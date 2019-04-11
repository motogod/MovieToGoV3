import React, { Component } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
// Scroll tab screen
import RankingScreen from './RankingScreen';
import TodayMovieScreen from './TodayMovieScreen';
import ThisWeekScreen from './ThisWeekScreen';
import RecentMovieScreen from './RecentMovieScreen';

import I18n from '../../i18n/i18n';
import { commonColor } from '../Shared/Data/Color';

class MainScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Test',
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
    return (
      <SafeAreaView style={{ flex: 1 }}>
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
          <RankingScreen style={{ color: 'blue', fontSize: 26 }} tabLabel={I18n.t('RANKING')} />
          <TodayMovieScreen style={{ color: 'blue', fontSize: 26 }} tabLabel={I18n.t('TODAY_MOVIE')} />
          <ThisWeekScreen style={{ color: 'blue', fontSize: 26 }} tabLabel={I18n.t('THIS_WEEK')} />
          <RecentMovieScreen style={{ color: 'blue', fontSize: 26 }} tabLabel={I18n.t('RECENT')} />
          <Text style={{ color: 'blue', fontSize: 26 }} tabLabel="React">what</Text>
        </ScrollableTabView>
      </SafeAreaView>
    );
  }
}

export default connect(null, {})(MainScreen);
