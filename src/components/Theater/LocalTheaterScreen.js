import React, { Component } from 'react';
import { View, Text, ScrollView, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import AwesomeButton from 'react-native-really-awesome-button';
import { Loader } from '../Shared/Modal/Loader';
import { fetchTheater } from '../../actions';

const { width } = Dimensions.get('window');

class LocalTheaterScreen extends Component {
  constructor(props) {
    super(props);

    const { enCity, lng, lat, cnCity } = this.props.navigation.state.params;

    this.state = { 
      movies: [], 
      loading: true, 
      navigation: this.props.navigation,
      enCity,
      cnCity,
      lng,
      lat
    };
  }

  componentDidMount() {
    this.props.fetchTheater({ 
      enCity: this.state.enCity,
      cnCity: this.state.cnCity,
      lng: this.state.lng,
      lat: this.state.lat
    });
  }

  renderTheater = ({ item }) => {
    const { enCity, navigation } = this.state;
    const { theaterCn, address, dist, theater } = item;
    const dbDist = dist / 1000;
    const kilometers = dbDist.toString().split('.');
    const meter = kilometers[1].toString().split('');

    return (
      <TouchableOpacity style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 10 }}>
        <View style={{ flex: 3 }}>
          <Text style={{ fontSize: 16, color: '#444f6c', fontWeight: '500' }}>{theaterCn}</Text>
          <Text style={{ fontSize: 13, fontWeight: '100', marginTop: 3 }}>{address}</Text>
        </View>
      <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
        <Text style={{ fontSize: 15, fontWeight: '400', color: '#444f6c' }}>{`${kilometers[0]}.${meter[0]} km`}</Text>
      </View>
      {/* <View style={{ width, height: 0.5, backgroundColor: 'gray' }} /> */}
      </TouchableOpacity>

      // <View style={{ flex: 1, flexDirection: 'row' }}>
      // <AwesomeButton width={width} backgroundColor={'#fff'} borderRadius={0} raiseLevel={3}>
      //   <View style={{ flex: 3, paddingLeft: 16, paddingVertical: 10 }}>
      //     <Text style={{ fontSize: 20, color: '#444f6c', fontWeight: '500' }}>{theaterCn}</Text>
      //     <Text style={{ fontSize: 13, fontWeight: '100', marginTop: 3 }}>{address}</Text>
      //   </View>
      // <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', paddingRight: 16 }}>
      //   <Text style={{ fontSize: 15, fontWeight: '400', color: '#444f6c' }}>{`${kilometers[0]}.${meter[0]} km`}</Text>
      // </View>
      // {/* <View style={{ width, height: 0.5, backgroundColor: 'gray' }} /> */}
      // </AwesomeButton>
      // </View>
    );
  }

  render() {
    const { theaterList } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={theaterList}
          renderItem={this.renderTheater}
          keyExtractor={(item, index) => index.toString()}             
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { theaterList } = state.TheaterListRedux;

  return { theaterList };
};

export default connect(mapStateToProps, { fetchTheater })(LocalTheaterScreen);
