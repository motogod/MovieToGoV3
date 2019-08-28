import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { fetchTodayMovieList } from '../../actions';
import { Loader } from '../Shared/Modal/Loader';

const { width, height } = Dimensions.get('window');

const halfWidth = width / 2;  

class TodayMovieScreen extends Component {
  componentDidMount() {
    this.props.fetchTodayMovieList();
  }
  renderMovieData = ({ item }) => {
    const { cnName, photoHref } = item;
    return (
      <Animatable.View animation='bounceIn' style={{ flex: 1, alignItems: 'center', marginTop: 5 }}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('MovieDetail', {
            enCity: 'TaipeiOthers', cnName
          })}
        >
          <Image 
            style={{ width: halfWidth - 20, height: 250, borderRadius: 10 }} 
            source={{ uri: photoHref }} 
            resizeMode='stretch'
          />
        </TouchableOpacity>
      </Animatable.View>
    );
  }

  render() {
    const { todayMovie, todayMovieLoading } = this.props;

    if (todayMovieLoading) {
      return <ActivityIndicator style={{ marginTop: 10 }} animating={true} />;
    }

    return (
      <View style={{ backgroundColor: 'black' }}>
        <FlatList
          style={{ marginTop: 15 }}
          numColumns={2}
          data={todayMovie}
          renderItem={this.renderMovieData}
          keyExtractor={(item, index) => index.toString()}  
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { todayMovie, todayMovieLoading } = state.MovieListRedux;

  return { todayMovie, todayMovieLoading };
};

const styles = StyleSheet.create({
  card: {
    width: width - 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    // elevation only work on Android
    elevation: 4,
    // alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
    marginTop: 15,
    padding: 15,
    // paddingHorizontal: 25,
    // paddingTop: 35,
    // paddingBottom: 16,
    borderRadius: 1,
    borderWidth: StyleSheet.hairlineWidth,
  },
});

export default connect(mapStateToProps, { fetchTodayMovieList })(TodayMovieScreen);
