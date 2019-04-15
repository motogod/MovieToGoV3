import React, { Component } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Dimensions, 
  ImageBackground, 
  Image, 
  StyleSheet 
} from 'react-native';
import { connect } from 'react-redux';
import { fetchMovieNews } from '../../actions';

class MovieNews extends Component {
  componentDidMount() {
    this.props.fetchMovieNews();
  }

  render() {
    console.log('MovieNews this.props =>', this.props);
    return (
      <View><Text>Hi Hi Hi</Text></View>
    );
  }
}

const mapStateToProps = (state) => {
  const { movieNews } = state.MovieListRedux;

  return { movieNews };
};

export default connect(mapStateToProps, { fetchMovieNews })(MovieNews);
