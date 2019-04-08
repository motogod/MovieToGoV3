import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import I18n from '../../i18n/i18n';

const { width } = Dimensions.get('window');

const halfWidth = width / 2;

const gridData = [
  { optionName: I18n.t('TIME_INQUIRY') },
  { optionName: 'Test2' },
  { optionName: 'Test3' },
  { optionName: 'Test4' },
  { optionName: 'Test5' }
]; 

class MoreScreen extends Component {
  renderGrid = ({ item }) => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow', paddingTop: 10 }}>
        <AwesomeButtonRick 
          textColor={'#FFFFFF'} 
          backgroundColor={'#C0C0C0'} 
          height={halfWidth - 10} 
          width={halfWidth - 10} 
          borderRadius={6}
        >
          {item.optionName}
        </AwesomeButtonRick>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          numColumns={2}
          data={gridData}
          renderItem={this.renderGrid}
          horizontal={false}
          keyExtractor={(item, index) => index.toString()}        
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export default MoreScreen;
