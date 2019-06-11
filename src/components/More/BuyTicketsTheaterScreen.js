import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity,
  FlatList, Dimensions, SafeAreaView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { fetchBuyTickets } from '../../actions';
import I18n from '../../i18n/i18n';

import AdMobBanner from '../GeneralComponent/AdMobBanner';
import { commonColor } from '../../components/Shared/Data/Color';

const { width } = Dimensions.get('window');

class BuyTicketsTheaterScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: I18n.t('TICKET_INQUIRY'),
    headerBackTitle: null,
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: commonColor.headerColor, 
      elevation: null
    }
  });

  componentDidMount() {
    this.props.fetchBuyTickets();
  }

  renderGrid = ({ item, index }) => {
    const { theaterPhoto, theaterCn, ticketAddress } = item;
    
    return (
      <Animatable.View animation='lightSpeedIn' delay={index * 150} style={styles.gridContainer}>
        <TouchableOpacity 
          onPress={() => this.props.navigation.navigate('TheaterTicketWebScreen', {
            theaterCn, ticketAddress
          })}
          textColor={'#FFFFFF'} 
          backgroundColor={'#FFFFFF'} 
          paddingTop={8}
          paddingBottom={8}
          width={width - 20} 
          borderRadius={1}
        >
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', padding: 15 }}>
            <Image 
              source={{ uri: theaterPhoto }} 
              style={styles.iconImage} 
              resizeMode='stretch'
            />
            <Text style={styles.iconText}>{theaterCn}</Text>
          </View>
          <View style={{ width, height: 0.5, backgroundColor: 'gray' }} />
        </TouchableOpacity>
      </Animatable.View>
    );
  }

  render() {
    const { buyTheaterTickets } = this.props;
    return (
      <SafeAreaView style={styles.container}>   
        <FlatList
          data={buyTheaterTickets}
          renderItem={(item, index) => this.renderGrid(item, index)}
          keyExtractor={(item, index) => index.toString()}   
        />
        <AdMobBanner />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  const { buyTheaterTickets } = state.MoreListRedux;

  return { buyTheaterTickets };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  gridContainer: {
    flex: 1, 
    justifyContent: 'center'
  },
  iconImage: {
    width: 45, 
    height: 45, 
    marginLeft: 5
  },
  iconText: {
    marginLeft: 10, 
    fontSize: 18, 
    color: '#444f6c', 
    fontWeight: '500',
    letterSpacing: 2
  }
});

export default connect(mapStateToProps, { fetchBuyTickets })(BuyTicketsTheaterScreen);
