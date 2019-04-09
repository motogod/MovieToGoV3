import React, { Component } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import RankingScreen from './RankingScreen';
import ThisWeekScreen from './ThisWeekScreen';
import I18n from '../../i18n/i18n';

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
          renderTabBar={() => <ScrollableTabBar />}
        >
          <RankingScreen style={{ color: 'blue', fontSize: 26 }} tabLabel={I18n.t('RANKING')}>what</RankingScreen>
          <Text style={{ color: 'blue', fontSize: 26 }} tabLabel="React">what</Text>
          <ThisWeekScreen style={{ color: 'blue', fontSize: 26 }} tabLabel={I18n.t('THIS_WEEK')} />
          <Text style={{ color: 'blue', fontSize: 26 }} tabLabel="React">what</Text>
          <Text style={{ color: 'blue', fontSize: 26 }} tabLabel="React">what</Text>
        </ScrollableTabView>
      </SafeAreaView>
    );
  }
}

export default connect(null, {})(MainScreen);
