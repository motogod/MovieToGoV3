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
  fetchThisWeek 
} from '../../actions';

class WelcomeScreen extends Component {
  componentWillMount() {
    this.props.fetchRanking();
    this.props.fetchTodayMovieList();
    this.props.fetchThisWeek();
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
  fetchThisWeek
})(WelcomeScreen);
