import React, { Component } from 'react';
import { View, Image, Text, StyleSheet,
  FlatList, Dimensions, SafeAreaView
} from 'react-native';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import { fetchDetail } from '../../actions';

import { Loader } from '../Shared/Modal/Loader';
import { commonColor } from '../Shared/Data/Color';

const { width } = Dimensions.get('window');

class MovieDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerBackTitle: null,
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: commonColor.headerColor, 
      elevation: null
    }
  });

  constructor(props) {
    super(props); 

    const { enCity, cnName } = this.props.navigation.state.params;

    this.state = {
      enCity, 
      cnName,
    };
  }

  componentDidMount() {
    const { enCity, cnName } = this.state;
    this.props.fetchDetail(enCity, cnName);
  }

  render() {
    const { movieDetailLoading, movieDetail } = this.props;

    if (movieDetailLoading) {
      return (
        <Loader loading={true} />
      );
    }

    console.log('movieDetail =>', movieDetail);

    console.log('movieDetail.videoId =>', movieDetail.videoId);

    return (
      <View style={{ width, height: 240 }}>
        <WebView
          mediaPlaybackRequiresUserAction={true}
          style={{ width, height: 240 }}
          source={{ uri: `https://www.youtube.com/embed/${movieDetail.videoId[0]}?rel=0` }}
        />
     </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { movieDetailLoading, movieDetail } = state.MovieListRedux;

  return { movieDetailLoading, movieDetail };
};

const styles = StyleSheet.create({

});

export default connect(mapStateToProps, { fetchDetail })(MovieDetail);
