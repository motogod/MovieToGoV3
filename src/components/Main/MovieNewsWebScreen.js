import React, { Component } from 'react';
import { 
  View, Text, FlatList, StyleSheet, Image, Dimensions, 
  TouchableOpacity 
} from 'react-native';
import { WebView } from 'react-native-webview';

import AdMobBanner from '../GeneralComponent/AdMobBanner';
import { serverData } from '../../api/ApiData';
import { commonColor } from '../Shared/Data/Color';

import LeftIcon from '../../assets/img/left_green_arrow.png';
import RightIcon from '../../assets/img/right_green_arrow.png';

class MovieNewsWebScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Wow NEWS',
    headerBackTitle: null,
    headerTintColor: '#fff',
    headerStyle: {
        backgroundColor: commonColor.headerColor, 
        elevation: null
    }
  });

  constructor(props) {
    super(props); 

    const { slug } = this.props.navigation.state.params;

    this.state = { slug };
  }

  goBack = () => {
    this.refs['webview'].goBack();
  }
  
  goForward = () => {
    this.refs['webview'].goForward();
  }

  render() {
    const { slug } = this.state;
    
    return (
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <WebView
            ref='webview'
            source={{ uri: `${serverData.wowNewsWebDomain}${slug}` }}
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

        <AdMobBanner />
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

export default MovieNewsWebScreen;
