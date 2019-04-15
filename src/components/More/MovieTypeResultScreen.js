import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Image } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchMovieStyle } from '../../actions';

import { Loader } from '../Shared/Modal/Loader';
import { serverData } from '../../api/ApiData';
import I18n from '../../i18n/i18n';

import { commonColor } from '../../components/Shared/Data/Color';

class MovieTypeResultScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: I18n.t('TYPE_INQUIRY'),
    headerBackTitle: null,
    headerTintColor: '#fff',
    headerStyle: {
        backgroundColor: commonColor.headerColor, 
        elevation: null
    }
  });

  componentDidMount() {
    const theApi = `${serverData.serverUrl}api/getMovieStyle1?`;
    let queryString = '';
    const { names } = this.props.navigation.state.params;
    // 串接 array 參數的 API
    names.forEach(value => {
      queryString = queryString.concat(`movieStyle[]=${value}&`);
    });
    // console.log('theApi is', `${theApi}${queryString}`);
    this.props.fetchMovieStyle(`${theApi}${queryString}`);     
  }

  render() {
    const { movieStyleList, movieStyleLoading } = this.props;

    if (movieStyleLoading) {
      return (
        <Loader loading={true} />
      );
    }

    let filterArray = [];
    let filterArray2 = [];
    // 篩選出 movieStyle 有資料才加入
    filterArray = movieStyleList.filter(values => {
      return values.movieStyle.length > 0;
    });
    // 利用 lodash 移除陣列內的物件有相同的 cnName 的物件
    filterArray2 = _.uniqBy(filterArray, 'cnName');
    
    console.log('filterArray2 =>', filterArray2);
    return (
      <View><Text>Test</Text></View>
    );
  }
}

const mapStateToProps = (state) => {
  const { movieStyleList, movieStyleLoading } = state.MoreListRedux;
  
  return { movieStyleList, movieStyleLoading };
};

export default connect(mapStateToProps, { fetchMovieStyle })(MovieTypeResultScreen);
