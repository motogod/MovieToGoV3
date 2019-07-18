import React, { Component } from 'react';
import { 
  View, Text, FlatList, StyleSheet, Image, Dimensions, 
  TouchableOpacity, ActivityIndicator
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { Loader } from '../Shared/Modal/Loader';
import { fetchPopularTv } from '../../actions';

const { width } = Dimensions.get('window');

class PopularTvScreen extends Component {
  componentDidMount() {
    this.props.fetchPopularTv();
  }

  renderTvData = ({ item, index }) => {
    const { name, original_name, first_air_date, overview, poster_path, id } = item;
    const content = overview === '' ? '暫無介紹' : overview;

    return (
      <Animatable.View animation='lightSpeedIn' delay={index * 50} style={styles.card}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('TvDetail', { id })}
        >
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Image 
                source={{ uri: `https://image.tmdb.org/t/p/w185_and_h278_bestv2${poster_path}` }} 
                style={{ width: 120, height: 180, borderRadius: 10 }} 
                resizeMode='contain'
              />
            </View>
            <View style={styles.textZone}>
              <Text style={styles.cnName}>{name}</Text>
              <Text style={styles.enName}>{original_name}</Text>
              <Text style={styles.movieDate}>{first_air_date}</Text>
              <Text numberOfLines={6} style={styles.movieContent}>{content.trim()}</Text>   
            </View>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    );
  }

  render() {
    const { popularTv } = this.props;

    if (popularTv.length === 0) {
        return <ActivityIndicator style={{ marginTop: 10 }} animating={true} />;
    }

    return (
      <View style={{ backgroundColor: 'rgba(0,0,0,.2)' }}>
        <FlatList
          data={popularTv}
          renderItem={(item, index) => this.renderTvData(item, index)}
          keyExtractor={(item, index) => index.toString()}  
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { popularTv } = state.MovieListRedux;

  return { popularTv };
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

export default connect(mapStateToProps, { fetchPopularTv })(PopularTvScreen);
