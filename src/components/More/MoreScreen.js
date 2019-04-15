import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, 
  FlatList, Dimensions, SafeAreaView
} from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import I18n from '../../i18n/i18n';

import TimeIcon from '../../assets/img/time.png';
import TypeIcon from '../../assets/img/type.png';
import TicketIcon from '../../assets/img/ticket.png';
import CashIcon from '../../assets/img/cash.png';
import HeartIcon from '../../assets/img/heart.png';

const { width } = Dimensions.get('window');

const gridData = [
  { optionName: I18n.t('TIME_INQUIRY'), source: TimeIcon, nextScreen: 'SearchMovieTimeScreen', barTitle: I18n.t('SEARCH_ALL_MOVIE') },
  { optionName: I18n.t('TYPE_INQUIRY'), source: TypeIcon, nextScreen: '', barTitle: '' },
  { optionName: I18n.t('TICKET_INQUIRY'), source: TicketIcon, nextScreen: 'BuyTicketsTheaterScreen', barTitle: I18n.t('TICKETS_LINKING') },
  { optionName: I18n.t('CASH_INQUIRY'), source: CashIcon, nextScreen: 'CashInfoScreen', barTitle: I18n.t('CASH_INFO') },
  { optionName: I18n.t('MY_COLLECTION'), source: HeartIcon, nextScreen: 'MyCollectionScreen', barTitle: I18n.t('MY_COLLECTION') }
]; 

class MoreScreen extends Component {
  renderGrid = ({ item }) => {
    const { nextScreen, barTitle } = item;
    return (
      <View style={styles.gridContainer}>
        <AwesomeButton 
          onPress={() => this.props.navigation.navigate(nextScreen, { barTitle })}
          textColor={'#FFFFFF'} 
          backgroundColor={'#FFFFFF'} 
          paddingTop={8}
          paddingBottom={8}
          width={width - 20} 
          borderRadius={1}
        >
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Image source={item.source} style={styles.iconImage} />
            <Text style={styles.iconText}>{item.optionName}</Text>
          </View>
        </AwesomeButton>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>   
        <FlatList
          data={gridData}
          renderItem={this.renderGrid}
          horizontal={false}
          keyExtractor={(item, index) => index.toString()}        
        />  
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  gridContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingTop: 10
  },
  iconImage: {
    width: 25, 
    height: 25, 
    marginLeft: 15
  },
  iconText: {
    marginLeft: 10, 
    fontSize: 16, 
    color: '#444f6c', 
    fontWeight: '500',
    letterSpacing: 2
  }
});

export default MoreScreen;
