import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Animated,
  Easing,
  FlatList,
  Dimensions,
  Platform,
  AppState
} from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Toast, { DURATION } from 'react-native-easy-toast';
import { WebView } from 'react-native-webview';
// 針對 Android 的 react-native-webview 無法全屏
import WebViewAndroid from 'react-native-android-fullscreen-webview-video';
import { Rating } from 'react-native-elements';
import { connect } from 'react-redux';

import AdMobBanner from '../GeneralComponent/AdMobBanner';
import Panel from './Panel';
import I18n from '../../i18n/i18n';
import {
  SplitMovieString,
  adjustImdbInfo,
  adjustRottenInfo,
  showPTTScore,
  checkSaveMovieDataExisted
} from './Function';
import { Loader } from '../Shared/Modal/Loader';
import { commonColor } from '../Shared/Data/Color';

import ImdbIcon from '../../assets/img/imdb.png';
import RottenIcon from '../../assets/img/rotten.png';
import LikeIcon from '../../assets/img/like.png';
import UnlikeIcon from '../../assets/img/unlike.png';

const { width } = Dimensions.get('window');
const halfWidth = width / 2;
const equalWidth = width / 3;

class MovieDetailPersist extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerBackTitle: null,
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: commonColor.headerColor,
      elevation: null
    }
  });

  constructor(props) {
    super(props);

    this.scale = new Animated.Value(0);

    const { movieDetailPersist } = this.props.navigation.state.params;

    this.state = {
      appState: AppState.currentState,
      movieDetailPersist,
      animation: new Animated.Value(0),
      opacity: new Animated.Value(1)
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    // const { enCity, cnName } = this.state;
    // this.props.fetchDetail(enCity, cnName);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    this.setState({ appState: nextAppState });
  }

  scalElem = (toValue, duration) => {
    this.scale.setValue(0);
    Animated.timing(this.scale, {
      toValue,
      duration,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  };

  renderWebView = videoId => {
    if (Platform.OS === 'android' && this.state.appState === 'active') {
      return (
        <View style={{ width, height: 240 }}>
          <WebViewAndroid
            mediaPlaybackRequiresUserAction={true}
            source={{ uri: `https://www.youtube.com/embed/${videoId}?rel=0` }}
          />
        </View>
      );
    }
    return (
      <View style={{ width, height: 240 }}>
        <WebView
          mediaPlaybackRequiresUserAction={true}
          source={{ uri: `https://www.youtube.com/embed/${videoId}?rel=0` }}
        />
      </View>
    );
  };

  renderStickyHeader = cnName => {
    return (
      <View style={styles.stickyHeader}>
        <Text
          style={{
            fontWeight: '900',
            color: 'white',
            fontSize: 20,
            margin: 8
          }}
        >
          {cnName}
        </Text>
      </View>
    );
  };

  renderTimeAndTicketButtonZone = (splitDate, splitTime, enCity, cnName) => {
    return (
      <View style={styles.card}>
        <View>
          <Text style={{ fontSize: 15 }}>{`${I18n.t(
            'RELEASE_DATE'
          )}${splitDate}`}</Text>
          <Text style={{ fontSize: 15, marginTop: 10 }}>{`${I18n.t(
            'MOVIE_TIME'
          )}${splitTime}`}</Text>
        </View>
        <View
          style={{
            marginTop: 15,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <AwesomeButton
            onPress={() =>
              this.props.navigation.navigate('SearchSingleMovieTimeScreen', {
                cnName
              })
            }
            textColor={'#FFFFFF'}
            backgroundColor={'#F5FCFF'}
            raiseLevel={6}
            paddingTop={0}
            paddingBottom={0}
            height={45}
            width={halfWidth - 20}
            borderRadius={1}
            borderWidth={1}
            borderColor={'#DDDDDD'}
          >
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={styles.iconText}>{I18n.t('TIME_INQUIRY')}</Text>
            </View>
          </AwesomeButton>

          <AwesomeButton
            onPress={() =>
              this.props.navigation.navigate('BuyTicketsTheaterScreen')
            }
            textColor={'#FFFFFF'}
            backgroundColor={'#F5FCFF'}
            raiseLevel={6}
            paddingTop={0}
            paddingBottom={0}
            height={45}
            width={halfWidth - 20}
            borderRadius={1}
            borderWidth={1}
            borderColor={'#DDDDDD'}
          >
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={styles.iconText}>{I18n.t('TICKET_INQUIRY')}</Text>
            </View>
          </AwesomeButton>
        </View>
      </View>
    );
  };

  renderImdbAndRotten = (imdbScore, rottenScore) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 15
        }}
      >
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View>
            <Image source={ImdbIcon} style={{ width: 50, height: 50 }} />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 13, fontWeight: '200', letterSpacing: 1 }}>
              {I18n.t('IMDB')}
            </Text>
            <Text style={{ fontSize: 21, marginTop: 3 }}>
              {adjustImdbInfo(imdbScore)}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View>
            <Image source={RottenIcon} style={{ width: 50, height: 50 }} />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 13, fontWeight: '200', letterSpacing: 1 }}>
              {I18n.t('ROTTEN')}
            </Text>
            <Text style={{ fontSize: 21, marginTop: 3 }}>
              {adjustRottenInfo(rottenScore)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  renderPTT = (goodMinePoint, cnName) => {
    return (
      <View style={{ marginTop: 15 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: '200', marginLeft: 5 }}>
            PTT
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: 'gray',
              fontWeight: 'bold',
              marginLeft: 5
            }}
          >
            {I18n.t('PTT_SCORE')}
          </Text>
        </View>
        <AwesomeButton
          onPress={() =>
            this.props.navigation.navigate('PttWebScreen', { cnName })
          }
          textColor={'#FFFFFF'}
          backgroundColor={'#F5FCFF'}
          raiseLevel={6}
          paddingTop={0}
          paddingBottom={0}
          height={45}
          width={width - 30}
          borderRadius={1}
          borderWidth={1}
          borderColor={'#DDDDDD'}
        >
          <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: 15 }}>
            <Rating
              readonly
              style={{ backgroundColor: '#F5FCFF' }}
              imageSize={20}
              fractions={1}
              startingValue={showPTTScore(goodMinePoint)}
            />
          </View>
        </AwesomeButton>
      </View>
    );
  };

  renderStills({ item }) {
    return (
      <View style={styles.phtoSection}>
        <Image
          source={{ uri: item }}
          style={{ width: halfWidth, height: 120 }}
        />
      </View>
    );
  }

  render() {
    const { selectedSingleEnCity } = this.props;
    const {
      cnName,
      enName,
      movieDate,
      movieTime,
      movieContent,
      videoId,
      imdbScore,
      rottenScore,
      movieActorCn,
      movieActorPhoto,
      movieStills,
      goodMinePoint
    } = this.state.movieDetailPersist;

    const splitDate = SplitMovieString(movieDate);
    const splitTime = SplitMovieString(movieTime);

    return (
      <ParallaxScrollView
        backgroundColor="transparent"
        contentBackgroundColor="transparent"
        parallaxHeaderHeight={240}
        renderForeground={() => this.renderWebView(videoId[0])}
        stickyHeaderHeight={42}
        renderStickyHeader={() => this.renderStickyHeader(cnName)}
      >
        <View style={styles.nameZone}>
          <View>
            <Text style={styles.cnName}>{cnName}</Text>
            <Text style={styles.enName}>{enName}</Text>
          </View>
        </View>

        {this.renderTimeAndTicketButtonZone(
          splitDate,
          splitTime,
          selectedSingleEnCity,
          cnName
        )}

        <View style={{ backgroundColor: '#F5F5F5', padding: 15 }} />

        <View style={styles.card}>
          <Text style={styles.movieScore}>{I18n.t('MOVIE_SCORE')}</Text>
          {this.renderImdbAndRotten(imdbScore, rottenScore)}
          {this.renderPTT(goodMinePoint, cnName)}
        </View>

        <View style={styles.dividenView} />

        <View style={[styles.card, { flex: 5 }]}>
          <Text style={styles.contentInfo}>{I18n.t('CONTENT_INFO')}</Text>
          <Panel numberOfLines={3} showExpandText={true}>
            {movieContent.trim()}
          </Panel>
        </View>

        {Platform.OS === 'ios' ? <AdMobBanner /> : <AdMobBanner />}

        <View style={styles.dividenView} />

        <View style={styles.card}>
          <Text style={styles.actor}>{I18n.t('ACTOR')}</Text>
          <FlatList
            style={styles.flatSection}
            data={movieActorPhoto}
            extraData={movieActorCn}
            renderItem={({ item, index }) => (
              <View style={styles.phtoSection}>
                <Image
                  source={{ uri: item }}
                  style={{ width: equalWidth, height: 120 }}
                />
                <Text style={styles.actorTitle}>{movieActorCn[index]}</Text>
              </View>
            )}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <View style={styles.dividenView} />

        <View style={styles.card}>
          <Text style={styles.stills}>{I18n.t('STILLS')}</Text>
          <FlatList
            style={styles.flatSection}
            data={movieStills}
            renderItem={this.renderStills}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <Toast
          ref="toast"
          style={{ backgroundColor: 'gray' }}
          position="top"
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: 'white' }}
        />
      </ParallaxScrollView>
    );
  }
}

const mapStateToProps = state => {
  const { selectedSingleEnCity } = state.MoreListRedux;

  return { selectedSingleEnCity };
};

const styles = StyleSheet.create({
  card: {
    width,
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 0
  },
  stickyHeader: {
    height: 42,
    backgroundColor: 'rgba(0,0,0,.2)',
    justifyContent: 'flex-start',
    paddingLeft: 15
  },
  iconText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#444f6c',
    fontWeight: '500',
    letterSpacing: 1
  },
  phtoSection: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    marginLeft: 5,
    marginRight: 5
  },
  actorTitle: {
    flex: 1,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  flatSection: {
    backgroundColor: '#ffffff',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10
  },
  nameZone: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    flexDirection: 'row'
  },
  cnName: {
    fontSize: 18,
    color: '#444f6c',
    fontWeight: '500',
    letterSpacing: 1
  },
  enName: {
    fontSize: 14,
    marginTop: 2,
    color: 'gray',
    letterSpacing: 2
  },
  dividenView: {
    backgroundColor: '#F5F5F5',
    padding: 15
  },
  stills: {
    color: '#2a2f43',
    fontWeight: 'bold',
    letterSpacing: 2
  },
  actor: {
    color: '#2a2f43',
    fontWeight: 'bold',
    letterSpacing: 2
  },
  contentInfo: {
    color: '#2a2f43',
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 15
  },
  movieScore: {
    color: '#2a2f43',
    fontWeight: 'bold',
    letterSpacing: 2
  }
});

export default connect(
  mapStateToProps,
  {}
)(MovieDetailPersist);
