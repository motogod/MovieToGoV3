import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions, 
  TouchableOpacity, StyleSheet, Image
} from 'react-native';
import { connect } from 'react-redux';
import { fetchTime } from '../../actions';
import { Loader } from '../Shared/Modal/Loader';
import { GetUserTime, SplitMovieTime } from './Function';
import { TimeButton, TimeGrayButton, VersionButton } from '../Shared/Button';
import { commonColor } from '../Shared/Data/Color';

const { width } = Dimensions.get('window');

class TheaterMovieTimeScreen extends Component {
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

    const { theater, enCity } = this.props.navigation.state.params;

    this.state = {
      theater, enCity
    };
  }

  componentDidMount() {
    const { enCity, theater } = this.state;

    this.props.fetchTime(enCity, theater);
  }

  renderTimeZone = (releasedTime) => {
    return (
      releasedTime.map((value, index) => {
        const userTime = GetUserTime.getUserHour();              
        const theTime = GetUserTime.getAsiaTime(value, 'YYYY/MM/DD HH:mm:ss');
        const hour = theTime.getHours();            
        const minute = (theTime.getMinutes() < 10 ? '0' : '') + theTime.getMinutes();
        if (hour !== 0 && hour !== 1 && userTime > hour) {
          return (
            <TimeGrayButton key={index}>{`${hour}:${minute}`}</TimeGrayButton>
          );
        }
        return (
          <TimeButton key={index}>{`${hour}:${minute}`}</TimeButton>
        );
      })
    );
  }

  renderList = ({ item }) => {
    const { cnName, enName, movieTime, photoHref, versionType, releasedTime } = item;

    const onlyTime = SplitMovieTime(movieTime);

    return (
      <TouchableOpacity 
        onPress={() => this.props.navigation.navigate('MovieDetail', {
          enCity: this.state.enCity, cnName
        })}
      >
        <View style={styles.card}>
          <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Image 
                    source={{ uri: photoHref }} 
                    style={styles.movieImage} 
                    resizeMode='contain'
                  />
                </View>
                <View style={{ flex: 3, marginLeft: 5, flexWrap: 'wrap' }}>
                  <Text style={styles.cnName}>{cnName}</Text>
                  <Text style={styles.enName}>{enName}</Text>
                  <Text style={styles.movieTime}>{onlyTime}</Text>
                  <VersionButton>{versionType}</VersionButton>
                </View>
              </View>
            </View>
            <View>
                <View style={{ flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-start' }}>
                  {this.renderTimeZone(releasedTime)}
                </View>
              </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { theaterMovieTimeLoading, theaterMovieTime } = this.props;

    if (theaterMovieTimeLoading) {
      return (
        <Loader loading={true} />
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,.2)' }}>
        <FlatList
          data={theaterMovieTime}
          renderItem={this.renderList}
          keyExtractor={(item, index) => index.toString()}             
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { theaterMovieTimeLoading, theaterMovieTime } = state.TheaterListRedux;

  return { theaterMovieTimeLoading, theaterMovieTime };
};

const styles = StyleSheet.create({
  card: {
    width,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    // elevation only work on Android
    elevation: 4,
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
    marginTop: 8,
    padding: 15,
    borderRadius: 0,
    borderWidth: StyleSheet.hairlineWidth,
  },
  cnName: {
    fontSize: 20, 
    color: '#444f6c', 
    fontWeight: '500',
    textAlign: 'left',
    letterSpacing: 1
  },
  enName: {
    fontSize: 16, 
    marginTop: 2, 
    color: 'gray',
    letterSpacing: 1
  },
  movieTime: {
    fontSize: 16, 
    marginTop: 8, 
    color: '#666666',
    letterSpacing: 2
  },
  movieImage: {
    width: 80, 
    height: 120, 
    borderRadius: 10
  }
});

export default connect(mapStateToProps, { fetchTime })(TheaterMovieTimeScreen);
