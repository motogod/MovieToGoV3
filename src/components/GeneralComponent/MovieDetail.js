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
  TouchableWithoutFeedback,
  TouchableHighlight,
  Platform,
  AppState
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Toast, { DURATION } from 'react-native-easy-toast';
import { WebView } from 'react-native-webview';
// 針對 Android 的 react-native-webview 無法全屏
import WebViewAndroid from 'react-native-android-fullscreen-webview-video';
import { Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDetail, saveDetail, deleteDetail } from '../../actions';
// Google reject Youtube player and AdMobBanner in the same screen.
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

class MovieDetail extends Component {
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

    const { enCity, cnName } = this.props.navigation.state.params;

    this.state = {
      appState: AppState.currentState,
      enCity,
      cnName,
      animation: new Animated.Value(0),
      opacity: new Animated.Value(1)
    };
  }
  
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    const { enCity, cnName } = this.state;
    this.props.fetchDetail(enCity, cnName);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }
  
  handleAppStateChange = (nextAppState) => {
    console.log('what is my nextAppSatte', nextAppState);
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
  // Google 表示手機鎖屏 會有背景播放問題 把 APP 下架(雖然實際上沒有...) 所以加入 appState 判斷
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

  renderLikeImage = (saveMovieDetail, movieDetail) => {
    const scale = this.scale.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0.5, 1]
    });

    const checkExisted = checkSaveMovieDataExisted(
      saveMovieDetail,
      movieDetail
    );

    if (checkExisted) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            alignSelf: 'center',
            marginRight: 8
          }}
        >
          <TouchableWithoutFeedback
            onPressIn={() => this.scalElem(1, 250)}
            onPressOut={() => {
              this.scalElem(0, 100);
              this.props.deleteDetail(saveMovieDetail, movieDetail);
            }}
          >
            <Animated.Image
              source={LikeIcon}
              style={{ width: 25, height: 25, transform: [{ scale }] }}
            />
          </TouchableWithoutFeedback>
        </View>
      );
    }

    return (
      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
          alignSelf: 'center',
          marginRight: 8
        }}
      >
        <TouchableWithoutFeedback
          onPressIn={() => this.scalElem(1, 250)}
          onPressOut={() => {
            this.scalElem(0, 100);
            this.refs.toast.show(
              `${I18n.t('COLLECTED')} ${movieDetail.cnName}`,
              DURATION.LENGTH_LONG
            );
            this.props.saveDetail(saveMovieDetail, movieDetail);
          }}
        >
          <Animated.Image
            source={UnlikeIcon}
            style={{ width: 25, height: 25, transform: [{ scale }] }}
          />
        </TouchableWithoutFeedback>
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
        <Animatable.View 
          animation='fadeIn'
          delay={150}
          style={{
            marginTop: 15,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <TouchableHighlight
            style={styles.buttonStyle}
            activeOpacity={0}
            underlayColor={'#F5FCFF'}
            onPress={() =>
              this.props.navigation.navigate('SearchSingleMovieTimeScreen', {
                cnName
              })
            }
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
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.buttonStyle}
            activeOpacity={0}
            underlayColor={'#F5FCFF'}
            onPress={() =>
              this.props.navigation.navigate('BuyTicketsTheaterScreen')
            }
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
          </TouchableHighlight>
        </Animatable.View>
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
        <TouchableHighlight
          style={[styles.buttonStyle, { width: width - 30 }]}
          activeOpacity={0}
          underlayColor={'#F5FCFF'}
          onPress={() =>
            this.props.navigation.navigate('PttWebScreen', { cnName })
          }
        >
          <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center', marginLeft: 15 }}>
            <Rating
              readonly
              style={{ backgroundColor: '#F5FCFF' }}
              imageSize={20}
              fractions={1}
              startingValue={showPTTScore(goodMinePoint)}
            />
          </View>
        </TouchableHighlight>
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
    // enCity 給 搜尋時刻用
    const { enCity } = this.state;
    const { movieDetailLoading } = this.props;

    if (movieDetailLoading) {
      return <Loader loading={true} />;
    }

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
    } = this.props.movieDetail;

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
          {this.renderLikeImage(
            this.props.saveMovieDetail,
            this.props.movieDetail
          )}
        </View>

        {this.renderTimeAndTicketButtonZone(
          splitDate,
          splitTime,
          enCity,
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

        <View style={[styles.card, { padding: 0 }]}>
          <Text style={styles.actor}>{I18n.t('ACTOR')}</Text>
          <FlatList
            style={styles.flatSection}
            showsHorizontalScrollIndicator={false}
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

        <View style={[styles.card, { padding: 0 }]}>
          <Text style={styles.stills}>{I18n.t('STILLS')}</Text>
          <FlatList
            style={styles.flatSection}
            showsHorizontalScrollIndicator={false}
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
  const {
    movieDetailLoading,
    movieDetail,
    saveMovieDetail
  } = state.MovieListRedux;

  return { movieDetailLoading, movieDetail, saveMovieDetail };
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
    letterSpacing: 2,
    marginLeft: 15,
    marginTop: 15
  },
  actor: {
    color: '#2a2f43',
    fontWeight: 'bold',
    letterSpacing: 2,
    marginLeft: 15,
    marginTop: 15
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
  },
  buttonStyle: {
    width: halfWidth - 20,
    height: 45,
    backgroundColor: '#F5FCFF',
    borderRadius: 1,
    borderWidth: 3,
    borderColor: '#DDDDDD'
  }
});

export default connect(
  mapStateToProps,
  { fetchDetail, saveDetail, deleteDetail }
)(MovieDetail);
