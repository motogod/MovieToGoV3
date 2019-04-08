import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { fetchThisWeek } from '../../actions';

class ThisWeekScreen extends Component {
  componentDidMount() {
    this.props.fetchThisWeek();
  }

  render() {
    return (
      <View><Text>媽媽我在這邊~~~</Text></View>
    );
  }
}

export default connect(null, { fetchThisWeek })(ThisWeekScreen);
