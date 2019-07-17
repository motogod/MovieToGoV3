import React, { Component } from 'react';
import { View, Image, Text, StyleSheet,
  FlatList, Dimensions,
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import I18n from '../../i18n/i18n';
import { Loader } from '../Shared/Modal/Loader';
import { commonColor } from '../Shared/Data/Color';
import { fetchTvDetail, defaultTvReducer } from '../../actions';
import AdMobBanner from '../GeneralComponent/AdMobBanner';
import Panel from './Panel';

import TmdbIcon from '../../assets/img/tmdb.png';

const { width } = Dimensions.get('window');
const halfWidth = width / 2;
const equalWidth = width / 3;

class TvDetail extends Component {
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

    const { id } = this.props.navigation.state.params;

    this.state = { id, videoId: '' };
  }

  componentDidMount() {
    const { id } = this.state;

    this.props.fetchTvDetail(id);
  }

  componentWillUnmount() {
    // 離開頁面時清空該影集的 reducer 資料，讓下次進來該頁面時 call API 時資料是空的
    // 因為 render 底下只用 reducer 的 length 資料來判斷 call API 的讀取條
    this.props.defaultTvReducer();
  }

  renderWebView = (videoId) => {
    return (
      <View style={{ width, height: 240 }}>
        <WebView
          mediaPlaybackRequiresUserAction={true}
          source={{ uri: `https://www.youtube.com/embed/${videoId}?rel=0` }}
        />
      </View>
    );
  }

  renderStickyHeader = (cnName) => {
    return (
      <View style={styles.stickyHeader}>
      <Text 
        style={{ 
          fontWeight: '900', color: 'white', fontSize: 20, margin: 8
        }}
      >{cnName}</Text>
    </View>
    );
  }

  renderSeasons({ item }) {
    const { name, episode_count, air_date, poster_path } = item;
    return (
      <View style={styles.phtoSection}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          style={{ width: equalWidth, height: 120 }}
        />
        <Text style={styles.actorTitle}>{`${name} - ${episode_count} ${I18n.t('EPISODE')}`}</Text>
        <Text style={styles.actorTitle}>{air_date}</Text>
      </View>
    );
  }

  renderStills({ item }) {
    return (
      <View style={styles.phtoSection}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.file_path}` }} 
          style={{ width: halfWidth, height: 120 }}
        />
      </View>      
    );
  }

  render() {
    const { tvStills, tvActorStills, tvVideoId, tvDetail } = this.props;
    const { 
      name, original_name, last_episode_to_air, next_episode_to_air, 
      overview, seasons, vote_average 
    } = this.props.tvDetail;

    const content = overview === '' ? '暫無介紹' : overview;

    // 頁面內的所有資料都有了才進入畫面處理
    if (tvVideoId.length === 0 || tvStills.length === 0 ||
        tvActorStills.length === 0 || Object.getOwnPropertyNames(tvDetail).length === 0) {
      return <Loader loading={true} />;
    }
    
    return (
      <ParallaxScrollView
        backgroundColor='transparent'
        contentBackgroundColor='transparent'
        parallaxHeaderHeight={240}
        renderForeground={() => this.renderWebView(tvVideoId[0].key)}
        stickyHeaderHeight={42}
        renderStickyHeader={() => this.renderStickyHeader(name)}
      >    
        <View style={styles.nameZone}>
          <View>
            <Text style={styles.cnName}>{name}</Text>
            <Text style={styles.enName}>{original_name}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image 
                source={TmdbIcon} 
                style={{ width: 65, height: 25 }} 
                resizeMode='contain' 
              />
              <Text style={[styles.stills, { fontSize: 26, marginLeft: 5 }]}>{vote_average}</Text>
            </View>
            
            <Text style={[styles.stills, { marginTop: 15 }]}>{I18n.t('LATEST_EPISODE')}</Text>
            <Text style={{ fontSize: 16, marginLeft: 15, marginTop: 10 }}>
              {`${last_episode_to_air.air_date}   ${last_episode_to_air.season_number} 季 ${last_episode_to_air.name}`}
            </Text>

            <Text style={[styles.stills, { marginTop: 15 }]}>{I18n.t('COMMING_SOON')}</Text>
            <Text style={{ fontSize: 16, marginLeft: 15, marginTop: 10 }}>
              {`${next_episode_to_air.air_date}   ${next_episode_to_air.season_number} 季 ${next_episode_to_air.name}`}
            </Text>  
          </View>
        </View>

        <View style={styles.dividenView} />

        <View style={[styles.card, { flex: 5 }]}>
          <Text style={styles.contentInfo}>{I18n.t('CONTENT_INFO')}</Text>
          <Panel numberOfLines={3} showExpandText={true}>
            {content.trim()}
          </Panel>

        </View>

        <AdMobBanner />

        <View style={styles.dividenView} />

        <View style={styles.card}>
          <Text style={styles.stills}>{I18n.t('SEASON_TITLE')}</Text>
          <FlatList
            style={styles.flatSection}
            data={seasons}
            renderItem={this.renderSeasons}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}  
          />
        </View>

        <View style={styles.dividenView} />

        <View style={styles.card}>
          <Text style={styles.actor}>{I18n.t('ACTOR')}</Text>
          <FlatList
            style={styles.flatSection}
            data={tvActorStills}
            renderItem={({ item, index }) => (
              <View style={styles.phtoSection}>
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500${item.profile_path}` }}
                  style={{ width: equalWidth, height: 120 }}
                />
                <Text style={styles.actorTitle}>{item.name}</Text>
              </View>)
            }
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}  
          />
        </View>

        <View style={styles.dividenView} />

        <View style={styles.card}>
          <Text style={styles.stills}>{I18n.t('STILLS')}</Text>
          <FlatList
            style={styles.flatSection}
            data={tvStills}
            renderItem={this.renderStills}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}  
          />
        </View>

      </ParallaxScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  const { tvDetail, tvVideoId, tvActorStills, tvStills } = state.MovieListRedux;

  return { tvDetail, tvVideoId, tvActorStills, tvStills };
};

const styles = StyleSheet.create({
  card: {
    width,
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 0,
  },
  dividenView: {
    backgroundColor: '#F5F5F5', 
    padding: 15
  },
  stickyHeader: {
    height: 42,
    backgroundColor: 'rgba(0,0,0,.2)',
    justifyContent: 'flex-start',
    paddingLeft: 15
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
  stills: {
    color: '#2a2f43', 
    fontWeight: 'bold', 
    letterSpacing: 2
  },
  flatSection: {
    backgroundColor: '#ffffff', 
    paddingTop: 15, 
    paddingBottom: 15, 
    paddingLeft: 10, 
    paddingRight: 10
  },
  actor: {
    color: '#2a2f43', 
    fontWeight: 'bold', 
    letterSpacing: 2
  },
  actorTitle: {
    flex: 1, 
    marginTop: 5,
    alignItems: 'center', 
    justifyContent: 'center', 
    alignSelf: 'center'
  },
  contentInfo: {
    color: '#2a2f43', 
    fontWeight: 'bold', 
    letterSpacing: 2, 
    marginBottom: 15
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
});

export default connect(mapStateToProps, { fetchTvDetail, defaultTvReducer })(TvDetail);
