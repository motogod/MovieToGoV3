import React, { Component } from 'react';
import { View, Text, StyleSheet, NativeModules, TouchableOpacity,
  FlatList, Dimensions, LayoutAnimation, Platform
} from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import ModalSelector from 'react-native-modal-selector';

import { connect } from 'react-redux';
import { sendSingleSearchForm, defaultSendSingleSearchForm } from '../../actions';
import MultiSlider from '../GeneralComponent/Slider/MultiSlider';
import I18n from '../../i18n/i18n';

import AdMobBanner from '../GeneralComponent/AdMobBanner';
import { commonColor } from '../../components/Shared/Data/Color';

import {   
  taipeiCities,
  northCities,
  centralCities,
  southCities,
  eastCities,
  islandCities
} from '../Shared/Data/CityArray';
  
const { width } = Dimensions.get('window');
const halfWidth = width / 2;

class SearchSingleMovieTimeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: I18n.t('SEARCH_SINGLE_MOVIE'),
    headerBackTitle: null,
    headerTintColor: '#fff',
    headerRight:
    <TouchableOpacity 
        style={{ flexDirection: 'row', paddingRight: 20 }}
        onPress={() => {
        console.log('What:', navigation.state.params);
          navigation.state.params.defaultState();
          navigation.state.params.defaultSearch();
        }} 
    >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>{I18n.t('HEADER_CANCEL')}</Text>
    </TouchableOpacity>,
    headerStyle: {
        backgroundColor: commonColor.headerColor, 
        elevation: null
    }
  });

  constructor(props) {
    super(props);

    const { cnName } = this.props.navigation.state.params;

    // set LayoutAnimation.spring() can be work for Android
    if (Platform.OS === 'android') {
      const { UIManager } = NativeModules;
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    this.state = { 
      userClickedCity: false, 
      stateCnCity: '',
      stateEnCity: '',
      stateFirstSlideValue: 0,
      stateSecondSliderValue: 24,
      cnName
    };

    this.renderItem = this.renderItem.bind(this);
  }

  componentWillMount() {
    this.props.navigation.setParams({
      defaultState: this.handleState,
      defaultSearch: this.props.defaultSendSingleSearchForm
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ 
      stateCnCity: nextProps.selectedSingleCnCity,
      stateEnCity: nextProps.selectedSingleEnCity,
      stateFirstSlideValue: nextProps.firstSingleSliderValue,
      stateSecondSliderValue: nextProps.secondSingleSliderValue
    });
  }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  handleState = () => {
    this.setState({ 
      userClickedCity: false, 
      stateCnCity: '',
      stateEnCity: '',
      stateFirstSlideValue: 0,
      stateSecondSliderValue: 24
    });
  }

  renderItem({ item }) {
    return (
      <View style={styles.gridContainer}>
        <ModalSelector
          data={item.cityArray}
          cancelText={I18n.t('CANCEL')}
          keyExtractor={value => value.id}
          labelExtractor={value => value.cnCity}
          optionContainerStyle={{ backgroundColor: '#F5FCFF' }}
          optionTextStyle={{ color: 'black' }}
          onChange={(value) => {
            this.setState({ 
              userClickedCity: true, 
              stateCnCity: value.cnCity,
              stateEnCity: value.enCity
            });
          }}
        >
          <AwesomeButton 
            textColor={'#FFFFFF'} 
            backgroundColor={'#FFFFFF'} 
            paddingTop={8}
            paddingBottom={8}
            width={width - 20} 
            borderRadius={1}
          >
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={styles.iconText}>{item.title}</Text>  
            </View>
          </AwesomeButton>
        </ModalSelector>
      </View>
    );
  }

  render() {
    const list = [
      {
        title: I18n.t('TAIPEI'),
        icon: 'av-timer',
        navigation: this.props.navigation,
        cityArray: taipeiCities,
        id: 0
      },
      {
        title: I18n.t('NORTH'),
        icon: 'av-timer',
        navigation: this.props.navigation,
        cityArray: northCities,
        id: 1
      },
      {
        title: I18n.t('CENTRAL'),
        icon: 'flight-takeoff',
        navigation: this.props.navigation,
        cityArray: centralCities,
        id: 2
      },
      {
        title: I18n.t('SOUTHERN'),
        icon: 'av-timer',
        navigation: this.props.navigation,
        cityArray: southCities,
        id: 3
      },
      {
        title: I18n.t('EAST'),
        icon: 'av-timer',
        navigation: this.props.navigation,
        cityArray: eastCities,
        id: 4
      },
      {
        title: I18n.t('OUTER_ISLAND'),
        icon: 'av-timer',
        navigation: this.props.navigation,
        cityArray: islandCities,
        id: 5
      },
    ];

    const { 
      userClickedCity, 
      stateCnCity, 
      stateEnCity, 
      stateFirstSlideValue, 
      stateSecondSliderValue,
      cnName
    } = this.state;
    console.log('userClickedCity', userClickedCity);
    console.log('stateCnCity', stateCnCity);
    // 一併加入 stateCnCity 在 redux-persist 是否有存值的判斷
    if (userClickedCity || stateCnCity !== '') {
        return (
          <View style={{ flex: 1, paddingTop: 20, alignItems: 'center', backgroundColor: commonColor.headerColor }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ marginTop: 20, fontSize: 20, color: 'yellow', fontWeight: '500', letterSpacing: 1 }}>{cnName}</Text>
              <Text style={{ marginTop: 20, fontSize: 18, color: '#fff', fontWeight: '200', letterSpacing: 1 }}>{I18n.t('CHOOSED_LOCATION')}</Text>
              <Text style={{ marginTop: 20, fontSize: 20, color: 'yellow', fontWeight: '500', letterSpacing: 1 }}>{stateCnCity}</Text>
              <Text style={{ marginTop: 30, fontSize: 18, color: '#fff', fontWeight: '200', letterSpacing: 1 }}>{I18n.t('CHOOSE_SLIDER_TIME')}</Text>
            </View>
            <View style={{ marginTop: 30, flexDirection: 'row' }}>
              <Text style={{ fontSize: 20, color: 'yellow', fontWeight: '500', letterSpacing: 2 }}>{stateFirstSlideValue}</Text>
              <Text style={{ fontSize: 20, color: 'yellow', fontWeight: '500', marginHorizontal: 15 }}>-</Text>
              <Text style={{ fontSize: 20, color: 'yellow', fontWeight: '500', letterSpacing: 2 }}>{stateSecondSliderValue}</Text>
            </View>
            <MultiSlider
              values={[stateFirstSlideValue, stateSecondSliderValue]}
              sliderLength={250}
              touchDimensions={{ height: 200, width: 200 }}
              onValuesChange={(values) => {
                this.setState({ stateFirstSlideValue: values[0], stateSecondSliderValue: values[1] });
                }
              }
              min={0}
              max={24}
              step={1}
            />
            <AwesomeButton 
              onPress={() => {
                this.props.sendSingleSearchForm(
                  stateCnCity,
                  stateEnCity,
                  stateFirstSlideValue,
                  stateSecondSliderValue
                );
  
                this.props.navigation.navigate('SearchSingleResultScreen', {
                  stateCnCity,
                  stateEnCity,
                  movieCnName: cnName,
                  stateFirstSlideValue,
                  stateSecondSliderValue                
                });
  
              }}
              style={{ marginTop: 30 }}
              textColor={'#FFFFFF'} 
              backgroundColor={'#FFFFFF'} 
              paddingTop={8}
              paddingBottom={8}
              height={40}
              width={halfWidth} 
              borderRadius={1}
              borderWidth={0.5}
            >
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={styles.iconText}>{I18n.t('SEARCH')}</Text>  
              </View>
            </AwesomeButton>

            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <AdMobBanner />
            </View>
          </View>
        );
      }

    return (
      <View style={{ flex: 1, backgroundColor: '#F5FCFF' }}>
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: '#444f6c', fontWeight: '200', letterSpacing: 1 }}>{I18n.t('CHOOSE_LOCATION')}</Text>
        </View>
        <FlatList
          data={list}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}             
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { 
    selectedSingleCnCity, 
    selectedSingleEnCity, 
    firstSingleSliderValue, 
    secondSingleSliderValue 
  } = state.MoreListRedux;

  return { selectedSingleCnCity, selectedSingleEnCity, firstSingleSliderValue, secondSingleSliderValue };
};

const styles = StyleSheet.create({
  gridContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingTop: 10
  },
  iconText: {
    marginLeft: 10, 
    fontSize: 16, 
    color: '#444f6c', 
    fontWeight: '500',
    letterSpacing: 2
  },
  card: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 0,
  },
});

export default connect(mapStateToProps, { sendSingleSearchForm, defaultSendSingleSearchForm })(SearchSingleMovieTimeScreen);
