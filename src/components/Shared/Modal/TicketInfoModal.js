import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Modal,
  FlatList,
  Dimensions,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { getTicketInformation } from '../../../actions';

import CancelIcon from '../../../assets/img/cancel.png';

const { width, height } = Dimensions.get('window');

class TicketInfoModal extends Component {
  
  render() {
    // theaterCn ticketType ticketPrice
    const { visible, onPress, ticketInformation } = this.props;
    console.log('ticketInformation', ticketInformation);

    let changeColor = 'white';

    return (
      <Modal
        transparent={true}
        animationType={'slide'}
        visible={visible}
        onRequestClose={() => { console.log('close modal'); }}
      >
        <SafeAreaView style={{ width, height, backgroundColor: '#F5FCFF' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.theaterCn}>{ticketInformation.theaterCn}</Text>
          <TouchableOpacity 
            onPress={onPress}
            style={{ flex: 1, alignItems: 'flex-end', padding: 20, justifyContent: 'flex-end' }}
          >
            <Image style={{ width: 40, height: 40 }} source={CancelIcon} />
          </TouchableOpacity>
          </View>
          <FlatList
          data={ticketInformation.ticketType}
          extraData={ticketInformation.ticketPrice}
          renderItem={({ item, index }) => {
            if (index % 2 === 0) {
              changeColor = '#DDDDDD';
            } else {
              changeColor = 'white';
            }
  
          return (
            <View style={{ flexDirection: 'row', backgroundColor: changeColor }}>
              <Text style={{ flex: 0.7, fontSize: 16, padding: 10 }}>{item}</Text>
              <View style={{ height: '100%', width: 5, backgroundColor: 'white' }}></View>
              <Text style={{ flex: 0.3, fontSize: 16, padding: 10 }}>{ticketInformation.ticketPrice[index]}</Text>
            </View>
          );
          }
          }
          keyExtractor={(item, index) => index.toString()}
        />
        </SafeAreaView>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  const { ticketInformation } = state.MoreListRedux;

  return { ticketInformation };
};

const styles = StyleSheet.create({
  theaterCn: {
    fontSize: 18, 
    color: '#444f6c', 
    fontWeight: '500',
    letterSpacing: 1,
    padding: 20
  },
});

export default connect(mapStateToProps, { getTicketInformation })(TicketInfoModal);
