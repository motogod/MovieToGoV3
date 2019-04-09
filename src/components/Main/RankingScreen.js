import React, { Component } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { fetchRanking } from '../../actions';

class RankingScreen extends Component {
  componentDidMount() {
    this.props.fetchRanking();
  }

  render() {
    return (
      <View>
        <Text>媽媽我在這邊</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { ranking } = state.MovieListRedux;

  return { ranking };
};

export default connect(mapStateToProps, { fetchRanking })(RankingScreen);
