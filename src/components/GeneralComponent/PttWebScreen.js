import React, { Component } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

import { commonColor } from '../Shared/Data/Color';

import LeftIcon from '../../assets/img/left_green_arrow.png';
import RightIcon from '../../assets/img/right_green_arrow.png';

class PttWebScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'PTT',
    headerBackTitle: null,
    headerTintColor: '#fff',
    headerStyle: {
        backgroundColor: commonColor.headerColor, 
        elevation: null
    }
  });

  constructor(props) {
    super(props); 
    const { cnName } = this.props.navigation.state.params;

    this.state = { cnName };
  }

  goBack = () => {
    this.refs['webview'].goBack();
  }


  goForward = () => {
    this.refs['webview'].goForward();
  }

  render() {
      const { cnName } = this.state;
    return (
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <WebView
          ref='webview'
          source={{ uri: `https://www.ptt.cc/bbs/movie/search?page=1&q=${cnName}` }}
          dataDetectorTypes='all'
          startInLoadingState={true}
          domStorageEnabled={true}
          javaScriptEnabled={true}
          automaticallyAdjustContentInsets={true}
        />
        <View style={styles.arrowView}>
          <TouchableOpacity onPress={() => this.goBack()}>
            <Image source={LeftIcon} style={{ height: 30, width: 30 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.goForward} onPress={() => this.goForward()}>
            <Image source={RightIcon} style={{ height: 30, width: 30 }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  arrowView: {
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%'
  },
  goForward: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  }
});

export default PttWebScreen;
