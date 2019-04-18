import React, { Component } from 'react';
import { 
  View, Text, FlatList, StyleSheet, Dimensions, 
  Image, TouchableOpacity 
} from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchMovieStyle } from '../../actions';

import AdMobBanner from '../GeneralComponent/AdMobBanner';
import { Loader } from '../Shared/Modal/Loader';
import { VersionButton } from '../Shared/Button';
import { serverData } from '../../api/ApiData';
import I18n from '../../i18n/i18n';

import { commonColor } from '../../components/Shared/Data/Color';
import index from 'react-native-swipeable';

const { width } = Dimensions.get('window');

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

  renderList = ({ item }) => {
    const { movieStyle, cnName, enName, photoHref } = item;

    return (
      <TouchableOpacity 
        onPress={() => this.props.navigation.navigate('MovieDetail', {
          enCity: 'TaipeiEast', cnName
        })}
      >
        <View style={styles.card}>
          <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Image 
                    source={{ uri: photoHref }} 
                    style={styles.movieImage} 
                    resizeMode='contain'
                  />
                </View>
                <View style={{ flex: 3, marginLeft: 5, flexWrap: 'wrap' }}>
                  <Text style={styles.cnName}>{cnName}</Text>
                  <Text style={styles.enName}>{enName}</Text>
                  <View style={{ flexDirection: 'row' }}>
                  {movieStyle.map((value, inNum) => {
                    return (
                      <VersionButton marginLeft={5} key={inNum}>{value}</VersionButton>
                    );
                  })
                  }
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
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

    return (
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,.2)' }}>
        <FlatList
          data={filterArray2}
          renderItem={this.renderList}
          keyExtractor={(item, index) => index.toString()}             
        />
        <AdMobBanner />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { movieStyleList, movieStyleLoading } = state.MoreListRedux;
  
  return { movieStyleList, movieStyleLoading };
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
  cnName: {
    fontSize: 20, 
    color: '#444f6c', 
    fontWeight: '500',
    textAlign: 'left',
    letterSpacing: 1
  },
  enName: {
    fontSize: 16, 
    marginTop: 2, 
    color: 'gray',
    letterSpacing: 1
  },
  movieTime: {
    fontSize: 16, 
    marginTop: 8, 
    color: '#666666',
    letterSpacing: 2
  },
  movieImage: {
    width: 80, 
    height: 120, 
    borderRadius: 10
  }
});

export default connect(mapStateToProps, { fetchMovieStyle })(MovieTypeResultScreen);
