import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Loader } from '../Shared/Modal/Loader';
import { fetchThisWeek } from '../../actions';
import { SplitMovieDate } from './Function';

const { width } = Dimensions.get('window');

const halfWidth = width / 2; 

class RecentMovieScreen extends Component {
  componentDidMount() {
    this.props.fetchThisWeek();
  }

  renderMovieData = ({ item }) => {
    const { cnName, enName, movieDate, movieContent, photoHref } = item;

    const onlyDate = SplitMovieDate(movieDate);

    return (
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('MovieDetail', {
            enCity: 'RecentMovie', cnName
          })}
        >
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Image 
                source={{ uri: photoHref }} 
                style={{ width: 120, height: 180, borderRadius: 10 }} 
                resizeMode='contain'
              />
            </View>
            <View style={styles.textZone}>
              <Text style={styles.cnName}>{cnName}</Text>
              <Text style={styles.enName}>{enName}</Text>
              <Text style={styles.movieDate}>{onlyDate}</Text>
              <Text numberOfLines={6} style={styles.movieContent}>{movieContent.trim()}}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { recentMovie } = this.props;

    // if (thisWeekLoading) {
    //   return (
    //     <Loader loading={true} />
    //   );
    // }
    return (
      <View style={{ backgroundColor: 'rgba(0,0,0,.2)' }}>
        <FlatList
          data={recentMovie}
          renderItem={this.renderMovieData}
          keyExtractor={(item, index) => index.toString()}  
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { recentMovie } = state.MovieListRedux;

  return { recentMovie };
};

const styles = StyleSheet.create({
  card: {
    width,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    // elevation only work on Android
    elevation: 4,
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
    marginTop: 8,
    padding: 15,
    borderRadius: 0,
    borderWidth: StyleSheet.hairlineWidth,
  },
  textZone: {
    flex: 2, 
    flexWrap: 'wrap',
    marginLeft: 20, 
    flexDirection: 'column', 
    marginTop: 2
  },
  cnName: {
    fontSize: 17, 
    color: '#444f6c', 
    fontWeight: '500',
    letterSpacing: 1
  },
  enName: {
    fontSize: 14, 
    marginTop: 2, 
    color: 'gray',
    letterSpacing: 2
  },
  movieDate: {
    fontSize: 17, 
    color: '#444f6c', 
    fontWeight: '500',
    marginTop: 10,
    letterSpacing: 1
  },
  movieContent: {
    fontSize: 10, 
    marginTop: 10, 
    fontWeight: '100'
  }
});

export default connect(mapStateToProps, { fetchThisWeek })(RecentMovieScreen);
