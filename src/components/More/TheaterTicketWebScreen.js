import React, { Component } from 'react';
import { View, WebView, TouchableOpacity, Text } from 'react-native';

import { commonColor } from '../Shared/Data/Color';

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
        <View 
          style={{ 
            padding: 18,
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'absolute',
            width: '100%'
          }}
        >
        <TouchableOpacity 
          onPress={() => this.goBack()}
        >
          <Text>後退</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ 
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
           }}
          onPress={() => this.goForward()}
        >
          <Text>前進</Text>
        </TouchableOpacity>
        </View>

        {/* <AdMobBanner
          adSize="fullBanner"
          adUnitID={this.state.admobId}
        /> */}
      </View>
    );
  }
}

export default TheaterTicketWebScreen;
