import React, { Component } from 'react';
import { 
  Text, 
  Image,
  StyleSheet,
  TouchableWithoutFeedback, 
  TouchableOpacity,
  View, Alert, Platform,
  LayoutAnimation,
  NativeModules
} from 'react-native';
import { DrawerActions } from 'react-navigation';
import { connect } from 'react-redux';
import {   
  taipeiCities,
  northCities,
  centralCities,
  southCities,
  eastCities,
  islandCities
} from '../Shared/Data/CityArray';

import DownArrow from '../../assets/img/down_arrow.png';
import UpArrow from '../../assets/img/up_arrow.png';

class DrawerListItem extends Component {
  constructor(props) {
    super(props);
    // set LayoutAnimation.spring() can be work for Android
    if (Platform.OS === 'android') {
      const { UIManager } = NativeModules;
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.state = { 
      expanded: false,
      icon: DownArrow,
      lng: '',
      lat: ''
    };
  }

  componentWillUpdate() {
    // LayoutAnimation.spring();
  }

  changeExpanded() {
    this.setState({ 
      expanded: !this.state.expanded, 
      icon: this.state.expanded ? DownArrow : UpArrow 
    });
  }

  renderZoneArea = (title, id, icon) => {
    return (
      <View key={id} style={{ flex: 1, flexDirection: 'row', padding: 20 }}>
        <View>
          <Text style={{ color: '#ffffff', fontSize: 20 }}>{title}</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
          <Image source={icon} style={{ height: 12, width: 12 }} />
        </View>
      </View>
    );
  }

  renderDescription(id) {
    if (this.state.expanded) {
      switch (id) {
        case 0:
          return taipeiCities.map(value => {
            return (
              <TouchableOpacity 
                key={value.id}
                style={styles.button}
                onPress={() => {
                  // this.props.item.navigation.dispatch(DrawerActions.closeDrawer());
                  this.props.item.navigation.navigate('LocalTheaterScreen', {
                    lng: this.state.lng,
                    lat: this.state.lat,
                    enCity: value.enCity,
                    cnCity: value.cnCity
                    });
                  }
                }
              >
                <Text style={styles.buttonText}>{value.cnCity}</Text>
              </TouchableOpacity>
            );
          });

        case 1:
          return northCities.map(value => {
            return (
              <TouchableOpacity 
                key={value.id}
                style={styles.button}
                onPress={() => {
                  // this.props.item.navigation.dispatch(DrawerActions.closeDrawer());
                  this.props.item.navigation.navigate('LocalTheaterScreen', {
                    lng: this.state.lng,
                    lat: this.state.lat,
                    enCity: value.enCity,
                    cnCity: value.cnCity
                    });
                  }
                }
              >
                <Text style={styles.buttonText}>{value.cnCity}</Text>
              </TouchableOpacity>
            );
          });

        case 2:
          return centralCities.map(value => {
            return (
              <TouchableOpacity 
                key={value.id}
                style={styles.button}
                onPress={() => {
                  // this.props.item.navigation.dispatch(DrawerActions.closeDrawer());
                  this.props.item.navigation.navigate('LocalTheaterScreen', {
                    lng: this.state.lng,
                    lat: this.state.lat,
                    enCity: value.enCity
                    });
                  }
                }
              >
                <Text style={styles.buttonText}>{value.cnCity}</Text>
              </TouchableOpacity>
            );
          });  

        case 3:
          return southCities.map(value => {
            return (
              <TouchableOpacity 
                key={value.id}
                style={styles.button}
                onPress={() => {
                  // this.props.item.navigation.dispatch(DrawerActions.closeDrawer());
                  this.props.item.navigation.navigate('LocalTheaterScreen', {
                    lng: this.state.lng,
                    lat: this.state.lat,
                    enCity: value.enCity
                    });
                  }
                }
              >
                <Text style={styles.buttonText}>{value.cnCity}</Text>
              </TouchableOpacity>
            );
          });  

        case 4:
          return eastCities.map(value => {
            return (
              <TouchableOpacity 
                key={value.id}
                style={styles.button}
                onPress={() => {
                  // this.props.item.navigation.dispatch(DrawerActions.closeDrawer());
                  this.props.item.navigation.navigate('LocalTheaterScreen', {
                    lng: this.state.lng,
                    lat: this.state.lat,
                    enCity: value.enCity
                    });
                  }
                }
              >
                <Text style={styles.buttonText}>{value.cnCity}</Text>
              </TouchableOpacity>
            );
          });  

        case 5:
          return islandCities.map(value => {
            return (
              <TouchableOpacity 
                key={value.id}
                style={styles.button}
                onPress={() => {
                  // this.props.item.navigation.dispatch(DrawerActions.closeDrawer());
                  this.props.item.navigation.navigate('LocalTheaterScreen', {
                    lng: this.state.lng,
                    lat: this.state.lat,
                    enCity: value.enCity
                    });
                  }
                }
              >
                <Text style={styles.buttonText}>{value.cnCity}</Text>
              </TouchableOpacity>
            );
          });  
        default:    
      }
    }
  }

  render() {
    const { title, id } = this.props.item;
    const { icon } = this.state;

    return (
      <TouchableWithoutFeedback onPress={() => this.changeExpanded()}>
        <View style={{ flex: 1 }}>
          {this.renderZoneArea(title, id, icon)}
          <View style={styles.center}>
            {this.renderDescription(id)}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#C2D3DA'
  },
  button: {
    flex: 1,
    width: '100%',
    margin: 0,
    padding: 10,
    paddingLeft: 27,
    backgroundColor: '#C2D3DA',
    borderRadius: 9,
  },
  buttonText: {
    color: '#585A56',
    fontSize: 15,
    fontWeight: 'bold',
  }
});

export default DrawerListItem;
