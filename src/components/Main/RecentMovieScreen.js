import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Loader } from '../Shared/Modal/Loader';
import { fetchThisWeek } from '../../actions';

const { width } = Dimensions.get('window');

const halfWidth = width / 2; 

class RecentMovieScreen extends Component {
  componentDidMount() {
    this.props.fetchThisWeek();
  }

  renderMovieData = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View>
            <Image 
              source={{ uri: item.photoHref }} 
              style={{ width: 120, height: 180, borderRadius: 10 }} 
              resizeMode='contain'
            />
          </View>
          <View style={styles.textZone}>
            <Text style={styles.cnName}>{item.cnName}</Text>
            <Text style={styles.enName}>{item.enName}</Text>
            <Text numberOfLines={6} style={styles.movieContent}>{item.movieContent.trim()}}</Text>
            <Text style={[styles.movieDate, { alignSelf: 'flex-end', justifyContent: 'flex-end', alignContent: 'flex-end', alignItems: 'flex-end', textAlign: 'right' }]}>{item.movieDate}</Text>
          </View>
        </View>
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
    width: halfWidth + 10, 
    marginLeft: 12, 
    flexDirection: 'column', 
    marginTop: 2,
    backgroundColor: 'yellow'
  },
  cnName: {
    fontSize: 16, 
    color: '#444f6c', 
    fontWeight: '500'
  },
  enName: {
    fontSize: 14, 
    marginTop: 2, 
    color: 'gray'
  },
  movieDate: {
    fontSize: 16, 
    marginTop: 10
  },
  movieContent: {
    fontSize: 10, 
    marginTop: 5, 
    fontWeight: '100'
  }
});

export default connect(mapStateToProps, { fetchThisWeek })(RecentMovieScreen);
