import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Image } from 'react-native';
import { Button } from 'react-native-elements';
import FilterComponent from './FilterComponent';
import I18n from '../../i18n/i18n';

import { commonColor } from '../../components/Shared/Data/Color';

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

class MovieTypeSearchScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: I18n.t('TYPE_INQUIRY'),
    headerBackTitle: null,
    headerTintColor: '#fff',
    headerStyle: {
        backgroundColor: commonColor.headerColor, 
        elevation: null
    }
  });

  constructor(props) {
    super(props);

    this.state = {
      names: []
    };
  }

  getIds = (name) => {
    // 使用call back function 以及 preState
    // 確保增加值至 names 一直是 array
    this.setState(prevState => ({
      names: [
        ...prevState.names,
        name,
      ],
    }));
  }
  // 取消勾選 CheckBox 移除該array欄位的值
  removeIds = (name) => {
    this.setState({
      names: this.state.names.filter(e => e !== name)
    });
  }

  renderItem = ({ item }) => {
    return (
      <FilterComponent item={item} getIds={this.getIds} removeIds={this.removeIds} />
    );
  }

  render() {
    const { names } = this.state;

    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#F5FCFF' }}>
        <FlatList
          data={movieStyleArray}
          renderItem={this.renderItem}
          horizontal={false}
          keyExtractor={(item, index) => index.toString()} 
        />

        {this.state.names.length > 0 ? 
          <Button 
            onPress={() => this.props.navigation.navigate('MovieTypeResultScreen', { names })}
            style={{ backgroundColor: commonColor.headerColor }}
            containerViewStyle={{ width: '100%', marginLeft: 0, marginRight: 0 }} 
            title={I18n.t('SEARCH')}
          /> : null
        }
      </View>
    );
  }
}

export default MovieTypeSearchScreen;
