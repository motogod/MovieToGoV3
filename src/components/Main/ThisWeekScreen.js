import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Loader } from '../Shared/Modal/Loader';
import { fetchThisWeek } from '../../actions';

const { width } = Dimensions.get('window');

const halfWidth = width / 2; 

class ThisWeekScreen extends Component {
  componentDidMount() {
    this.props.fetchThisWeek();
  }

  renderMovieData = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ backgroundColor: 'yellow' }}>
            <Image 
              source={{ uri: item.photoHref }} 
              style={{ width: 120, height: 180 }} 
              resizeMode='contain'
            />
          </View>
          <View style={{ width: halfWidth + 10, marginLeft: 12, flexDirection: 'column', backgroundColor: 'pink' }}>
            <Text style={{ fontSize: 16, color: '#444f6c' }}>{item.cnName}</Text>
            <Text style={{ fontSize: 14, marginTop: 2, color: 'gray' }}>{item.enName}</Text>
            <Text style={{ fontSize: 16, marginTop: 6 }}>{item.movieDate}</Text>
            <Text numberOfLines={7} style={{ fontSize: 10, marginTop: 12, fontWeight: '100' }}>{item.movieContent.trim()}}</Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { thisWeek, thisWeekLoading } = this.props;

    if (thisWeekLoading) {
      return (
        <Loader loading={true} />
      );
    }
    return (
      <View>
        <FlatList
          data={thisWeek}
          renderItem={this.renderMovieData}
          keyExtractor={(item, index) => index.toString()}  
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { thisWeek, thisWeekLoading } = state.MovieListRedux;

  return { thisWeek, thisWeekLoading };
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

export default connect(mapStateToProps, { fetchThisWeek })(ThisWeekScreen);
