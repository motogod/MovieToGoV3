import React, { Component } from 'react';
import { View, Text, ScrollView, Image, FlatList } from 'react-native';
import DrawerListItem from './DrawerListItem';
import I18n from '../../i18n/i18n';

import DrawerHeaderIcon from '../../assets/img/drawer_header_icon.png';

class DrawerPanelScreen extends Component {
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
      <ScrollView style={{ flex: 1, backgroundColor: '#666666' }}>
        <View>
          <View style={{ marginTop: 50, justifyContent: 'center', alignItems: 'center' }}>
            <Image 
              source={DrawerHeaderIcon} 
              style={{ width: 150, height: 50 }} 
              resizeMode='contain'
            />
          </View>
          <FlatList
            data={list}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}             
          />
        </View>
      </ScrollView>
    );
  }
}

export default DrawerPanelScreen;
