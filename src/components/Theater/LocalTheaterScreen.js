import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions, 
  TouchableOpacity, StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { Loader } from '../Shared/Modal/Loader';
import { fetchTheater } from '../../actions';

import { commonColor } from '../Shared/Data/Color';

const { width } = Dimensions.get('window');


class LocalTheaterScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.cnCity}`,
    headerBackTitle: null,
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: commonColor.headerColor, 
      elevation: null
    }
  });

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
      <TouchableOpacity 
        onPress={() => {
          this.props.navigation.navigate('TheaterMovieTimeScreen', {
            theater, enCity, theaterCn
          });
        }} 
        style={styles.listContainer}
      >
        <View style={{ flex: 3 }}>
          <Text style={styles.theaterCn}>{theaterCn}</Text>
          <Text style={styles.address}>{address}</Text>
        </View>
        <View style={styles.kmContainer}>
          <Text style={styles.meter}>{`${kilometers[0]}.${meter[0]} km`}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { theaterList, theaterLoading } = this.props;

    if (theaterLoading) {
      return (
        <Loader loading={true} />
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={theaterList}
          ItemSeparatorComponent={() => <View style={{ width, height: 0.5, backgroundColor: 'gray' }} />}
          renderItem={this.renderTheater}
          keyExtractor={(item, index) => index.toString()}             
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { theaterList, theaterLoading } = state.TheaterListRedux;

  return { theaterList, theaterLoading };
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

export default connect(mapStateToProps, { fetchTheater })(LocalTheaterScreen);
