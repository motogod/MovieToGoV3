import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  Platform 
} from 'react-native';
import { connect } from 'react-redux';
import { 
  fetchRanking, 
  fetchMovieNews,
  fetchTodayMovieList, 
  fetchThisWeek,
  fetchRecentMovie,
  fetchBuyTickets,
  saveLocation
} from '../../actions';

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = { lng: '', lat: '' };
  }

  componentWillMount() {
    // 先 fetch ScrollTab 的資料
    this.props.fetchRanking();
    this.props.fetchMovieNews();
    this.props.fetchTodayMovieList();
    this.props.fetchThisWeek();
    this.props.fetchRecentMovie();
  }

  componentDidMount() {
    this.timer = setTimeout(() => { 
      this.props.navigation.navigate('MainScreen');
    }, 2500);

    this.getCurentPosition();
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  // get device location
  getCurentPosition() {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('my lng', position.coords.longitude);
          console.log('my lat', position.coords.latitude);
          this.setState({ lng: position.coords.longitude, lat: position.coords.latitude });
          this.props.saveLocation({ lng: position.coords.longitude, lat: position.coords.latitude });
        },
        (error) => {
          console.log('my error is =>');
          console.log(error.message);
          console.log(error.code);
          //TODO: better design
          switch (error.code) {
            case 1:
              if (Platform.OS === 'ios') {
                // Alert.alert('ios1', 'ios2');
              } else {
                // Alert.alert('android1', 'android2');
              }
              break;
            default:
              // Alert.alert('開啟GPS時戲院可依距離來顯示', '');
          }
        },
        { enableHighAccuracy: false, timeout: 100000, maximumAge: 30000 }
      );
    } catch (e) {   
      console.log(e);   
    }
  }

  render() {
    return (
      <View>
        <Text>Welcome</Text>
      </View>
    );
  }
}

export default connect(null, { 
  fetchRanking, 
  fetchMovieNews,
  fetchTodayMovieList,
  fetchThisWeek,
  fetchRecentMovie,
  fetchBuyTickets,
  saveLocation
})(WelcomeScreen);
