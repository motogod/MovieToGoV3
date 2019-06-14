import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, SafeAreaView, 
  TextInput, Image, ActivityIndicator, TouchableOpacity, Platform
} from 'react-native';
import _ from 'lodash';
import Highlighter from 'react-native-highlight-words';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { fetchTodayMovieListV2 } from '../../actions';

import AdMobBanner from '../GeneralComponent/AdMobBanner';
import I18n from '../../i18n/i18n';
import SearchIcon from '../../assets/img/search.png';

const { width } = Dimensions.get('window');
const equalWidth = (width / 2);

class SearchScreen extends Component {
  constructor(props) {
    super(props);

    let textInputMarginTop = 0;
    if (Platform.OS === 'android') {
      textInputMarginTop = 16;
    }

    this.state = {
      textInputMarginTop,
      inputText: '',
      userFilterData: [],
      showLoadingIcon: false
    };
  }

  componentDidMount() {
    // this.props.fetchTodayMovieListV2();
  }

  // about the query: https://stackoverflow.com/questions/5324798/how-to-search-an-array-in-jquery-like-sql-like-value-statement
  changeInside = (tex) => {
    // 輸入框為空: 停止轉圈圈 ; 搜尋資料設定為空
    if (tex === '') {
      this.setState({ showLoadingIcon: false, userFilterData: [], inputText: tex });
      return;
    } 
    // 輸入框不為空: 開始轉圈及資料設定
    this.setState({ showLoadingIcon: true, inputText: tex });
    // 使用者輸入完字串之後轉圈消失
    setTimeout(() => {
      this.setState({
        showLoadingIcon: false
      });
    }, 1000);

    const { searchMovie } = this.props;

    const inputName = tex.toString().trim().toLowerCase();
    let filterData = [];

    filterData = searchMovie.filter(item => { 
      return (
        item.enName !== null && item.enName.toLowerCase().includes(inputName)
      ) || (
        item.cnName !== null && item.cnName.toLowerCase().includes(inputName));
    });

    if (filterData !== []) {
      this.setState({ userFilterData: filterData });
    } 
  }

  renderLoadingCircle = () => {
    return (
      <View style={{ paddingHorizontal: 10 }}>
        <ActivityIndicator size='small' color='gray' />
      </View>
    );
  }

  renderItem = ({ item }) => {
    const { inputText } = this.state;

    return (
      <Animatable.View animation='fadeInDown'>
      <TouchableOpacity
        onPress={() => {
          setTimeout(() => {
            this.props.navigation.navigate('MovieDetail', { 
                enCity: item.enCity, 
                cnName: item.cnName
              });
          }, 500);
        }}
      >
          <View style={{ paddingVertical: 15, paddingHorizontal: 20, flexDirection: 'row' }}>
            <View>
              <Image
                style={{ width: 60, height: 90, borderRadius: 10 }}
                source={{ uri: item.photoHref }}
                resizeMode='stretch'
              />
            </View>
            <View style={{ marginLeft: 8, flexWrap: 'wrap', width: equalWidth, justifyContent: 'center' }}>
              <Highlighter
                style={styles.cnName}
                highlightStyle={{ color: 'gold' }}
                searchWords={[inputText]}
                textToHighlight={item.cnName ? item.cnName : ''}
              />
              <Highlighter
                style={styles.enName}
                highlightStyle={{ color: 'gold' }}
                searchWords={[inputText]}
                textToHighlight={item.enName ? item.enName : ''}
              />
            </View>
          </View>
        
      </TouchableOpacity>
      </Animatable.View>
    );
  }

  render() {
    const { inputText, userFilterData, showLoadingIcon, textInputMarginTop } = this.state;
    // 利用 lodash 移除陣列內的物件有相同的 cnName 的物件 (皆以中文片名為移除重複的狀況)
    const finalFilterData = _.uniqBy(userFilterData, 'cnName');
    // Android 有第一個字會消失的Bug 必須加 value={this.state.inputName}
    console.log('finalFilterData', finalFilterData);
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F5FCFF' }}>
          <View style={[styles.container, { marginTop: textInputMarginTop }]}>
            <View style={styles.sectionStyle}>
              <Image source={SearchIcon} style={styles.imageStyle} />
              <TextInput 
                autoFocus={true}
                style={styles.textInputStyle}
                onChangeText={tex => this.changeInside(tex)}
                value={inputText}
                placeholder={I18n.t('ENTER_MOVIE_NAME')}
                underlineColorAndroid="transparent"
              />
              {showLoadingIcon ? this.renderLoadingCircle() : null}
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <FlatList
              data={finalFilterData}
              renderItem={this.renderItem} 
              keyExtractor={(item, index) => index.toString()}         
            />
          </View>
          <AdMobBanner />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  const { searchMovie } = state.MovieListRedux;

  return { searchMovie };
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 16,
    flexDirection: 'row'
  },    
  sectionStyle: {
    height: 48,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: '#000'
  },
  imageStyle: {
    height: 15,
    width: 15,
    marginLeft: 10,
    resizeMode: 'stretch',
    alignItems: 'center'
  },
  textInputStyle: {
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
    fontSize: 17, 
    borderBottomWidth: 0,
    borderBottomColor: '#212121',
    color: '#212121'
  },
  cnName: {
    fontSize: 17, 
    color: '#444f6c', 
    fontWeight: '500',
    letterSpacing: 1
  },
  enName: {
    marginTop: 12, 
    color: 'gray',
    letterSpacing: 2
  },
});

export default connect(mapStateToProps, { fetchTodayMovieListV2 })(SearchScreen);
