import React, { Component } from 'react';
import { 
  View, Text, FlatList, StyleSheet, Image, Dimensions, 
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { getTheaterListWithTicket, getTicketInformation } from '../../actions';

import I18n from '../../i18n/i18n';
import TicketInfoModal from '../Shared/Modal/TicketInfoModal';

import { commonColor } from '../../components/Shared/Data/Color';

const { width } = Dimensions.get('window');

class CashInfoDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: I18n.t('CASH_INFO'),
    headerBackTitle: null,
    headerTintColor: '#fff',
    headerStyle: {
        backgroundColor: commonColor.headerColor, 
        elevation: null
    }
  });

  constructor(props) {
    super(props);

    const { ticketZone } = this.props.navigation.state.params;

    this.state = { ticketZone, visibleModal: false };
  }

  componentDidMount() {
    const { ticketZone } = this.state;
    
    this.props.getTheaterListWithTicket(ticketZone);
  }

  // close the Confirm
  onClose = () => {
    this.setState({ visibleModal: false });   
  }

  renderTheater = ({ item }) => {
    const { ticketZone } = this.state;
    const { theaterCn, address } = item;
    
    return (
      <TouchableOpacity 
        onPress={() => {
          this.props.getTicketInformation(ticketZone, theaterCn);
          this.setState({ visibleModal: true });
        }} 
        style={styles.listContainer}
      >
        <View>
          <Text style={styles.theaterCn}>{theaterCn}</Text>
          <Text style={styles.address}>{address}</Text>
        </View>
      </TouchableOpacity>
    );
  }


  render() {
    const { visibleModal, ticketZone, theaterCn } = this.state;
    const { ticketTheater } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={ticketTheater}
          ItemSeparatorComponent={() => <View style={{ width, height: 0.5, backgroundColor: 'gray' }} />}
          renderItem={this.renderTheater}
          keyExtractor={(item, index) => index.toString()}             
        />  
        <TicketInfoModal
          ticketZone={ticketZone} 
          theaterCn={theaterCn}
          visible={visibleModal} 
          onPress={this.onClose} 
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { ticketTheater } = state.MoreListRedux;
  
  return { ticketTheater };
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1, 
    flexDirection: 'row', 
    paddingHorizontal: 16, 
    paddingVertical: 10
  },
  theaterCn: {
    fontSize: 16, 
    color: '#444f6c', 
    fontWeight: '500'
  },
  address: {
    fontSize: 13, 
    fontWeight: '100', 
    marginTop: 3
  },
  kmContainer: {
    flex: 1, 
    alignItems: 'flex-end', 
    justifyContent: 'center'
  },
  meter: {
    fontSize: 15, 
    fontWeight: '400', 
    color: '#444f6c'
  }
});

export default connect(mapStateToProps, { 
    getTheaterListWithTicket, getTicketInformation 
})(CashInfoDetailScreen);
