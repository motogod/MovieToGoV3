import React, { Component } from 'react';
import { 
  View, 
  Text, 
  FlatList,
  TouchableOpacity, 
  Dimensions,
  Image, 
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { fetchMovieNews } from '../../actions';

const { width } = Dimensions.get('window');

class MovieNews extends Component {
  componentDidMount() {
    this.props.fetchMovieNews();
  }

  renderMovieNews = ({ item }) => {
    // slug: 跳轉的網址參數, data 內含圖片網址
    const { title, slug, data } = item;
    const imageUrl = data[0].data[0].value.url;

    return (
      <TouchableOpacity 
        onPress={() => this.props.navigation.navigate('MovieNewsWebScreen', {
          slug
        })}
      >
        <View style={[styles.card, { flexWrap: 'wrap' }]}>
          <Image 
            source={{ uri: imageUrl }} 
            style={{ width: width - 30, height: 250, }} 
            resizeMode='stretch'
          />
          <Text numberOfLines={3} style={styles.cnName}>{title}</Text>
      </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { movieNewsLoading, movieNews } = this.props;

    if (movieNewsLoading) {
      return <ActivityIndicator style={{ marginTop: 10 }} animating={true} />;
    }

    return (
      <View style={{ backgroundColor: 'rgba(0,0,0,.2)' }}>
        <FlatList
          data={movieNews}
          renderItem={this.renderMovieNews}
          keyExtractor={(item, index) => index.toString()}  
        />
    </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { movieNewsLoading, movieNews } = state.MovieListRedux;

  return { movieNewsLoading, movieNews };
};

const styles = StyleSheet.create({
  card: {
    width: width - 30,
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
    borderRadius: 0,
    // borderWidth: StyleSheet.hairlineWidth,
    borderWidth: 1,
  },
  cnName: {
    fontSize: 14, 
    color: '#444f6c', 
    fontWeight: '200',
    marginTop: 10,
    marginBottom: 16,
    paddingHorizontal: 15
  }
});

export default connect(mapStateToProps, { fetchMovieNews })(MovieNews);
