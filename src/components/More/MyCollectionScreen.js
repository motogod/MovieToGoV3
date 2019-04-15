import React, { Component } from 'react';
import { View, Image, Text, StyleSheet,
  FlatList, Dimensions, TouchableWithoutFeedback
} from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';
import { connect } from 'react-redux';
import { deleteDetail } from '../../actions';

import SwipeMovie from './SwipeMovie';
import I18n from '../../i18n/i18n';

import { commonColor } from '../../components/Shared/Data/Color';

const { width } = Dimensions.get('window');
const equalWidth = (width / 2);

class MyCollectionScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: I18n.t('MY_COLLECTION'),
    headerBackTitle: null,
    headerTintColor: '#fff',
    headerStyle: {
        backgroundColor: commonColor.headerColor, 
        elevation: null
    }
  });

  deleteMovie = (movieDetail) => {
    const { saveMovieDetail } = this.props;

    this.refs.toast.show(`${I18n.t('DELETED')} ${movieDetail.cnName}`, DURATION.LENGTH_LONG);
    this.props.deleteDetail(saveMovieDetail, movieDetail);
  }

  renderItem = ({ item }) => {
    return (
      <SwipeMovie 
        item={item} 
        deleteMovie={this.deleteMovie} 
        navigation={this.props.navigation}
      />
    );
  }

  render() {
    const { saveMovieDetail } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ backgroundColor: '#ffffff' }}
          data={saveMovieDetail}
          renderItem={this.renderItem} 
          keyExtractor={(item, index) => index.toString()}   
        />
        <Toast
          ref="toast"
          style={{ backgroundColor: 'red' }}
          position='bottom'
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: 'white' }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { saveMovieDetail } = state.MovieListRedux;

  return { saveMovieDetail };
};

export default connect(mapStateToProps, { deleteDetail })(MyCollectionScreen);
