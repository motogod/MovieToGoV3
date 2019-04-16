import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import ModalSelector from 'react-native-modal-selector';

import I18n from '../../i18n/i18n';

import { commonColor } from '../../components/Shared/Data/Color';

import {   
  taipeiCities,
  northCities,
  centralCities,
  southCities,
  eastCities,
  islandCities
} from '../Shared/Data/CityArray';

const { width } = Dimensions.get('window');

class CashInfoScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: I18n.t('CASH_INFO'),
    headerBackTitle: null,
    headerTintColor: '#fff',
    headerStyle: {
        backgroundColor: commonColor.headerColor, 
        elevation: null
    }
  });

  renderItem = ({ item }) => {
    return (
      <View style={styles.gridContainer}>
        <ModalSelector
          data={item.cityArray}
          cancelText={I18n.t('CANCEL')}
          keyExtractor={value => value.id}
          labelExtractor={value => value.cnCity}
          optionContainerStyle={{ backgroundColor: '#F5FCFF' }}
          optionTextStyle={{ color: 'black' }}
          onChange={(value) => {
            this.props.navigation.navigate('CashInfoDetailScreen', {
                ticketZone: value.ticketZone
            });
          }}
        >
          <AwesomeButton 
            textColor={'#FFFFFF'} 
            backgroundColor={'#FFFFFF'} 
            paddingTop={8}
            paddingBottom={8}
            width={width - 20} 
            borderRadius={1}
          >
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={styles.iconText}>{item.title}</Text>  
            </View>
          </AwesomeButton>
        </ModalSelector>
      </View>
    );
  }

  render() {
    const list = [
      {
        title: I18n.t('TAIPEI'),
        icon: 'av-timer',
        navigation: this.props.navigation,
        cityArray: taipeiCities,
        id: 0
      },
      {
        title: I18n.t('NORTH'),
        icon: 'av-timer',
        navigation: this.props.navigation,
        cityArray: northCities,
        id: 1
      },
      {
        title: I18n.t('CENTRAL'),
        icon: 'flight-takeoff',
        navigation: this.props.navigation,
        cityArray: centralCities,
        id: 2
      },
      {
        title: I18n.t('SOUTHERN'),
        icon: 'av-timer',
        navigation: this.props.navigation,
        cityArray: southCities,
        id: 3
      },
      {
        title: I18n.t('EAST'),
        icon: 'av-timer',
        navigation: this.props.navigation,
        cityArray: eastCities,
        id: 4
      },
      {
        title: I18n.t('OUTER_ISLAND'),
        icon: 'av-timer',
        navigation: this.props.navigation,
        cityArray: islandCities,
        id: 5
      },
    ];

    console.log('CashInfo this.props =>', this.props);

    return (
      <View style={{ flex: 1, backgroundColor: '#F5FCFF' }}>
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text style={{ fontSize: 15, color: '#444f6c', fontWeight: '200', letterSpacing: 1 }}>{I18n.t('TICKET_REFERENCE_INFO')}</Text>
        </View>
        <FlatList
          data={list}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}             
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gridContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingTop: 10
  },
  iconText: {
    marginLeft: 10, 
    fontSize: 16, 
    color: '#444f6c', 
    fontWeight: '500',
    letterSpacing: 2
  }
});

export default CashInfoScreen;
