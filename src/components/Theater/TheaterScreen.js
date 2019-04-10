import React, { Component } from 'react';
import { View, Text, ScrollView, Image, FlatList, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import DrawerListItem from '../Drawer/DrawerListItem';
import { commonColor } from '../Shared/Data/Color';
import I18n from '../../i18n/i18n';

import DrawerHeaderIcon from '../../assets/img/drawer_header_icon.png';

class TheaterScreen extends Component {
  renderItem({ item }) {
    return <DrawerListItem item={item} />;
  }

  render() {
    const list = [
      {
        title: I18n.t('TAIPEI'),
        icon: 'av-timer',
        navigation: this.props.navigation,
        id: 0
      },
      {
        title: I18n.t('NORTH'),
        icon: 'av-timer',
        navigation: this.props.navigation,
        id: 1
      },
      {
        title: I18n.t('CENTRAL'),
        icon: 'flight-takeoff',
        navigation: this.props.navigation,
        id: 2
      },
      {
        title: I18n.t('SOUTHERN'),
        icon: 'av-timer',
        navigation: this.props.navigation,
        id: 3
      },
      {
        title: I18n.t('EAST'),
        icon: 'av-timer',
        navigation: this.props.navigation,
        id: 4
      },
      {
        title: I18n.t('OUTER_ISLAND'),
        icon: 'av-timer',
        navigation: this.props.navigation,
        id: 5
      },
    ];   
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#666666' }}>
        <ScrollView style={{ flex: 1, backgroundColor: '#666666' }}>
          <FlatList
            data={list}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}             
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(null, {})(TheaterScreen);
