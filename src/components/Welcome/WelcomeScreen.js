import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet 
} from 'react-native';
import { connect } from 'react-redux';
import { 
  fetchRanking, 
  fetchTodayMovieList, 
  fetchThisWeek,
  fetchRecentMovie,
  fetchBuyTickets
} from '../../actions';

class WelcomeScreen extends Component {
  componentWillMount() {
    // 先 fetch ScrollTab 的資料
    this.props.fetchRanking();
    this.props.fetchTodayMovieList();
    this.props.fetchThisWeek();
    this.props.fetchRecentMovie();
  }

  componentDidMount() {
    this.timer = setTimeout(() => { 
      this.props.navigation.navigate('MainScreen');
    }, 2500);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
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
  fetchTodayMovieList,
  fetchThisWeek,
  fetchRecentMovie,
  fetchBuyTickets
})(WelcomeScreen);
