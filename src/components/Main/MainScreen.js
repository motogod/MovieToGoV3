import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ThisWeekScreen from './ThisWeekScreen';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';

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
      <ScrollableTabView
        initialPage={0}
        renderTabBar={() => <ScrollableTabBar />}
      >
          <Text style={{ color: 'blue', fontSize: 26 }} tabLabel="React">what</Text>
          <Text style={{ color: 'blue', fontSize: 26 }} tabLabel="React">what</Text>
          <ThisWeekScreen style={{ color: 'blue', fontSize: 26 }} tabLabel='本週' />
          <Text style={{ color: 'blue', fontSize: 26 }} tabLabel="React">what</Text>
          <Text style={{ color: 'blue', fontSize: 26 }} tabLabel="React">what</Text>
        </ScrollableTabView>
      
    );
  }
}

export default connect(null, {})(MainScreen);
