import React, { Component } from 'react';
import { 
  View, 
  Text, 
  Image,
  StyleSheet,
  Animated,
  Platform,
  ActivityIndicator
} from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';
import { 
  fetchRanking, 
  fetchMovieNews,
  fetchTodayMovieList, 
  fetchTodayMovieListV2,
  fetchThisWeek,
  fetchRecentMovie,
  fetchBuyTickets,
  saveLocation
} from '../../actions';

import WelcomeIcon from '../../assets/img/welcome_icon1.png';

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'MainScreen' })],
});

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = { lng: '', lat: '', animation: new Animated.Value(0) };
  }

  componentWillMount() {
    // 先 fetch ScrollTab 的資料
    this.props.fetchRanking();
    this.props.fetchMovieNews();
    this.props.fetchTodayMovieList();
    this.props.fetchTodayMovieListV2();
    this.props.fetchThisWeek();
    this.props.fetchRecentMovie();
  }

  componentDidMount() {
    this.timer = setTimeout(() => { 
      // this.props.navigation.navigate('MainScreen');
      this.props.navigation.dispatch(resetAction);
    }, 2500);

    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 2000
    }).start(() => {
      this.state.animation.setValue(0);
    });

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

  loadingText = () => {
    return (
      <View>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={{ fontSize: 16, marginTop: 8, color: 'gray' }}>電影資料同步中...</Text>
      </View>
    );
  }

  render() {
    // About animate setting
    const xInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    const yInterpolate = this.state.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['0deg', '0deg', '360deg'],
    });

    const animatedStyles = {
      transform: [{ rotateX: xInterpolate }, { rotateY: yInterpolate }]
    };

    return (
      <View style={{ flex: 1, backgroundColor: '#FFF100' }}>
        <Animated.View style={[styles.imageView, animatedStyles]}>
          <Image 
            source={WelcomeIcon} 
            style={{ width: 200, height: 200 }} 
          />
        </Animated.View>

        <View style={{ flex: 0.1, alignItems: 'center', marginBottom: 25 }}>
          {this.loadingText()}
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageView: {
    flex: 0.9, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  welcomeText: {
    fontSize: 16, 
    marginLeft: 15, 
    color: 'gray', 
    alignItems: 'flex-start', 
    alignSelf: 'flex-start'
  }
});

export default connect(null, { 
  fetchRanking, 
  fetchMovieNews,
  fetchTodayMovieList,
  fetchTodayMovieListV2,
  fetchThisWeek,
  fetchRecentMovie,
  fetchBuyTickets,
  saveLocation
})(WelcomeScreen);
