import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, SafeAreaView, 
  TextInput, Image, ActivityIndicator, TouchableOpacity
} from 'react-native';
import _ from 'lodash';
import Highlighter from 'react-native-highlight-words';
import { connect } from 'react-redux';
import { fetchMovieStyle } from '../../actions';

import SearchIcon from '../../assets/img/search.png';

const { width } = Dimensions.get('window');
const equalWidth = (width / 2);

const movieStyleArray = [
  { id: '0', name: '動作' },
  { id: '1', name: '科幻' },
  { id: '2', name: '恐怖' },
  { id: '3', name: '懸疑' },
  { id: '4', name: '驚悚' },
  { id: '5', name: '冒險' },
  { id: '6', name: '奇幻' },
  { id: '7', name: '喜劇' },
  { id: '8', name: '動畫' },
  { id: '9', name: '犯罪' },
  { id: '10', name: '愛情' },
  { id: '11', name: '音樂' },
  { id: '12', name: '歌舞' },
  { id: '13', name: '劇情' },
  { id: '14', name: '紀錄片' },
  { id: '15', name: '戰爭' },
];

class SearchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputText: '',
      userFilterData: [],
      showLoadingIcon: false
    };
  }

  componentDidMount() {
    const theApi = 'https://obscure-reaches-65656.herokuapp.com/api/getMovieStyle1?';
    let queryString = '';

    // 串接 array 參數的 API // 撈全部類型
    movieStyleArray.forEach(value => {
      queryString = queryString.concat(`movieStyle[]=${value.name}&`);
    });
    this.props.fetchMovieStyle(`${theApi}${queryString}`);
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

    const { movieStyleList } = this.props;

    const inputName = tex.toString().trim().toLowerCase();
    let filterData = [];

    movieStyleList.filter(item => { 
      if (item.enName !== null || item.cnName !== null) {
        filterData = movieStyleList.filter(({ enName, cnName }) => 
          enName.toLowerCase().indexOf(inputName) >= 0 || 
          cnName.trim().toLowerCase().indexOf(inputName) >= 0 
        );
      } 
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
      <TouchableOpacity
        onPress={() => {
          setTimeout(() => {
            this.props.navigation.navigate('MovieDetail', { 
                enCity: 'TaipeiEast', 
                cnName: item.cnName
              });
          }, 500);
        }}
      >
          <View style={{ padding: 15, flexDirection: 'row' }}>
            <View>
              <Image
                style={{ width: 50, height: 50 }}
                source={{ uri: item.photoHref }}
              />
            </View>
            <View style={{ marginLeft: 8, flexWrap: 'wrap', width: equalWidth }}>
              {/* <Text style={{ fontSize: 16, color: '#444f6c' }}>{item.cnName}</Text> */}
              <Highlighter
                style={{ fontSize: 16, color: '#ffffff' }}
                highlightStyle={{ color: 'gold' }}
                searchWords={[inputText]}
                textToHighlight={item.cnName ? item.cnName : ''}
              />
              {/* <Text style={{ fontSize: 12, color: 'gray', marginTop: 12 }}>{item.enName}</Text> */}
              <Highlighter
                style={{ fontSize: 12, color: '#ffffff', marginTop: 12 }}
                highlightStyle={{ color: 'gold' }}
                searchWords={[inputText]}
                textToHighlight={item.enName ? item.enName : ''}
              />
            </View>
          </View>
        
      </TouchableOpacity>
    );
  }

  render() {
    const { inputText, userFilterData, showLoadingIcon } = this.state;

    // 利用 lodash 移除陣列內的物件有相同的 cnName 的物件 (皆以中文片名為移除重複的狀況)
    const finalFilterData = _.uniqBy(userFilterData, 'cnName');
    // Android 有第一個字會消失的Bug 必須加 value={this.state.inputName}
    console.log('finalFilterData', finalFilterData);
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F5FCFF' }}>
        <View>
          <View style={styles.container}>
            <View style={styles.sectionStyle}>
              <Image source={SearchIcon} style={styles.imageStyle} />
              <TextInput 
                style={styles.textInputStyle}
                onChangeText={tex => this.changeInside(tex)}
                value={inputText}
                placeholder={'請輸入院線電影片名...'}
                underlineColorAndroid="transparent"
              />
              {showLoadingIcon ? this.renderLoadingCircle() : null}
            </View>
          </View>
          <View>
            <FlatList
              data={finalFilterData}
              renderItem={this.renderItem} 
              keyExtractor={(item, index) => index.toString()}         
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  const { movieStyleList, movieStyleLoading } = state.MoreListRedux;

  return { movieStyleList, movieStyleLoading };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  }
});

export default connect(mapStateToProps, { fetchMovieStyle })(SearchScreen);
