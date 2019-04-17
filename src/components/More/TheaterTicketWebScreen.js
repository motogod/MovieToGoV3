import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { WebView } from 'react-native-webview';

import { commonColor } from '../Shared/Data/Color';

import LeftIcon from '../../assets/img/left_arrow.png';
import RightIcon from '../../assets/img/right_arrow.png';

class TheaterTicketWebScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.theaterCn}`,
    headerBackTitle: null,
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: commonColor.headerColor, 
      elevation: null
    }
  });

  constructor(props) {
    super(props); 

    const { ticketAddress } = this.props.navigation.state.params;

    this.state = { ticketAddress };
  }

  goBack = () => {
    this.refs['webview'].goBack();
  }
  
  goForward = () => {
    this.refs['webview'].goForward();
  }

  render() {
    const { ticketAddress } = this.state;

    return (
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <WebView
          ref='webview'
          source={{ uri: ticketAddress }}
          dataDetectorTypes='all'
          startInLoadingState={true}
          domStorageEnabled={true}
          javaScriptEnabled={true}
          automaticallyAdjustContentInsets={true}
        />
        <View style={styles.arrowView}>
          <TouchableOpacity onPress={() => this.goBack()}>
            <Image source={LeftIcon} style={{ height: 20, width: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.goForward} onPress={() => this.goForward()}>
            <Image source={RightIcon} style={{ height: 20, width: 20 }} />
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

export default TheaterTicketWebScreen;
