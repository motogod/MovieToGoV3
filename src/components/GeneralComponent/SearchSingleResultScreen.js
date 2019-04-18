import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, NativeModules, TouchableWithoutFeedback,
  FlatList, Dimensions, LayoutAnimation, Platform, TouchableOpacity, SectionList
} from 'react-native';
import { connect } from 'react-redux';
import { fetchSingleMovieTime } from '../../actions';

import AdMobBanner from '../GeneralComponent/AdMobBanner';
import { GetUserTime } from './Function';
import { Loader } from '../Shared/Modal/Loader';
import { commonColor } from '../../components/Shared/Data/Color';

class SearchSingleResultScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.stateCnCity}`,
    headerBackTitle: null,
    headerTintColor: '#fff',
    headerStyle: {
        backgroundColor: commonColor.headerColor, 
        elevation: null
    }
  });

  constructor(props) {
    super(props);

    const { 
      stateEnCity, 
      stateCnCity, 
      movieCnName,
      stateFirstSlideValue, 
      stateSecondSliderValue 
    } = this.props.navigation.state.params;
    
    this.state = { 
      enCity: stateEnCity, 
      cnName: stateCnCity,
      movieCnName,
      stateFirstSlideValue,
      stateSecondSliderValue
    };
  }

  componentDidMount() {
    const { 
      enCity,
      cnName,
      movieCnName,
      stateFirstSlideValue,
      stateSecondSliderValue
    } = this.state;

    this.props.fetchSingleMovieTime(      
      enCity,
      stateFirstSlideValue,
      stateSecondSliderValue,
      movieCnName,
    );
  }

  sectionComp = (info) => {
    const theaterCn = info.section.title;
    return (
      <TouchableWithoutFeedback>
        <View style={{ flex: 1, backgroundColor: '#DCDCDC' }}>
          <Text style={styles.sectionTitle}>{theaterCn}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderSectionItem = (info) => {
    console.log('what is my info', info);
    // 這邊的cnName指電影名稱
    const cnName = info.item.cnName;
    const versionType = info.item.versionType;
    return (
      <TouchableOpacity 
        onPress={() => {
        this.props.navigation.navigate('MovieDetail', {
          enCity: this.state.enCity,
          cnName
          });
        }
        }
      >
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row', backgroundColor: '#F5F5F5' }}>
          <Text style={styles.sectionSubTitle}>{cnName}</Text>
          <Text style={styles.sectionSubVersion}>{versionType}</Text>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', backgroundColor: '#F8F8FF' }}>
        {info.item.releasedTime.map((value, index) => {
          const theTime = GetUserTime.getAsiaTime(value, 'YYYY/MM/DD HH:mm:ss');
          const hour = theTime.getHours();            
          const minute = (theTime.getMinutes() < 10 ? '0' : '') + theTime.getMinutes();
          return (
            <Text style={styles.sectionTimeTitle} key={index}>{`${hour}:${minute}`}</Text>
          );
        })
        }
        </View>
      </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { searchSingleMovieTimeLoading, searchSingleMovieTime } = this.props;

    if (searchSingleMovieTimeLoading) {
      return (
        <Loader loading={true} />
      );
    }
    console.log('searchSingleMovieTime', searchSingleMovieTime);
    return (
      <View style={{ flex: 1 }}>
        <SectionList
          renderSectionHeader={this.sectionComp}
          renderItem={this.renderSectionItem}
          sections={searchSingleMovieTime}
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
        <AdMobBanner />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { searchSingleMovieTimeLoading, searchSingleMovieTime } = state.MoreListRedux;
  
  return { searchSingleMovieTimeLoading, searchSingleMovieTime };
};  

const styles = StyleSheet.create({
  sectionTitle: {
    color: 'black',
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    borderColor: 'black', 
    borderRadius: 0, 
    borderWidth: 1,
    fontSize: 18
  },
  sectionSubTitle: {
    paddingLeft: 25,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#F5F5F5', 
    color: '#7ba2a8', 
    fontSize: 18
  },
  sectionSubVersion: {
    paddingRight: 25,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 'auto',
    backgroundColor: '#F5F5F5',
    color: '#7ba2a8', 
    fontSize: 14
  },
  sectionTimeTitle: {
    paddingLeft: 25, 
    paddingTop: 10, 
    paddingBottom: 10
  },
  separator: {
    flex: 1, 
    flexDirection: 'row', 
    height: 1, 
    backgroundColor: 'gray'
  }
});

export default connect(mapStateToProps, { fetchSingleMovieTime })(SearchSingleResultScreen);
