import React, { Component } from 'react';
import { View, Text, ScrollView, Image, FlatList, 
  SafeAreaView, StyleSheet, Dimensions, Animated 
} from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import ModalSelector from 'react-native-modal-selector';
import { connect } from 'react-redux';

import {   
  taipeiCities,
  northCities,
  centralCities,
  southCities,
  eastCities,
  islandCities
} from '../Shared/Data/CityArray';

import I18n from '../../i18n/i18n';

const { width } = Dimensions.get('window');

const createAnimationStyle = (animation) => {
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-5, 0]
  });

  return {
    opacity: animation,
    transform: [{
      translateY
    }]
  };
};

class TheaterScreen extends Component {
  constructor(props) {
    super(props);

    this.state = { theaterItem: new Animated.Value(0) };
  }

  componentDidMount() {
    Animated.stagger(100, [
      Animated.timing(this.state.theaterItem, {
        toValue: 1,
        duration: 1000
      })
    ]).start(() => {

    });
  }

  renderItem = ({ item }) => {
    const { lat, lng } = this.props;

    const itemStyle = createAnimationStyle(this.state.theaterItem);

    return (
      <Animated.View style={[styles.gridContainer, itemStyle]}>
        <ModalSelector
          data={item.cityArray}
          cancelText={I18n.t('CANCEL')}
          keyExtractor={value => value.id}
          labelExtractor={value => value.cnCity}
          optionContainerStyle={{ backgroundColor: '#F5FCFF' }}
          optionTextStyle={{ color: 'black' }}
          onChange={(value) => {
            item.navigation.navigate('LocalTheaterScreen', {
              lng,
              lat,
              enCity: value.enCity,
              cnCity: value.cnCity
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
      </Animated.View>
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
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text style={{ fontSize: 15, color: '#444f6c', fontWeight: '200', letterSpacing: 1 }}>{I18n.t('TIME_REFERENCE_INFO')}</Text>
        </View>
        <FlatList
          data={list}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}             
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state.LocationRedux', state.LocationRedux);
  const { lat, lng } = state.LocationRedux;
  
  return { lat, lng };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  gridContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingTop: 10
  },
  iconImage: {
    width: 25, 
    height: 25, 
    marginLeft: 15
  },
  iconText: {
    marginLeft: 10, 
    fontSize: 16, 
    color: '#444f6c', 
    fontWeight: '500',
    letterSpacing: 2
  }
});

export default connect(mapStateToProps, {})(TheaterScreen);
