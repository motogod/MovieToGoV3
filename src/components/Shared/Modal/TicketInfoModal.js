import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Modal,
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
    const { visible, onPress, ticketInformation } = this.props;
    console.log('ticketInformation', ticketInformation);
    return (
      <Modal
        transparent={true}
        animationType={'slide'}
        visible={visible}
        onRequestClose={() => { console.log('close modal'); }}
      >
        <SafeAreaView style={{ width, height, backgroundColor: '#F5FCFF' }}>
          <TouchableOpacity 
            onPress={onPress}
            style={{ alignItems: 'flex-end', padding: 20 }}
          >
            <Image style={{ width: 40, height: 40 }} source={CancelIcon} />
          </TouchableOpacity>
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
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: 'gray',
    height: 50,
    width: 50,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default connect(mapStateToProps, { getTicketInformation })(TicketInfoModal);
