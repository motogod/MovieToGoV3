import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity,
  FlatList, Dimensions, SafeAreaView
} from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import { connect } from 'react-redux';
import { fetchBuyTickets } from '../../actions';
import I18n from '../../i18n/i18n';

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

  renderGrid = ({ item }) => {
    const { theaterPhoto, theaterCn, ticketAddress } = item;
    return (
      <View style={styles.gridContainer}>
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
            <Image source={{ uri: theaterPhoto }} style={styles.iconImage} />
            <Text style={styles.iconText}>{theaterCn}</Text>
          </View>
          <View style={{ width, height: 0.5, backgroundColor: 'gray' }} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { buyTheaterTickets } = this.props;
    return (
      <SafeAreaView style={styles.container}>   
        <FlatList
          data={buyTheaterTickets}
          renderItem={this.renderGrid}
          keyExtractor={(item, index) => index.toString()}   
        />
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
