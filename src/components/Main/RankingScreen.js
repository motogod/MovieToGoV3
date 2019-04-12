import React, { Component } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Dimensions, 
  ImageBackground, 
  Image, 
  StyleSheet 
} from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { fetchRanking } from '../../actions';

const { width, height } = Dimensions.get('window');

class RankingScreen extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    // this.props.fetchRanking();
  }

  renderDot = () => {
    return (
      <View 
        style={{
          backgroundColor: 'gray', 
          width: 10, 
          height: 10,
          borderRadius: 4, 
          marginLeft: 6, 
          marginRight: 6, 
          marginTop: 3, 
          marginBottom: 0 }} 
      />
    );
  }

  renderActiveDot = () => {
    return (
      <View 
        style={{ 
          backgroundColor: '#ffffff', 
          width: 10, 
          height: 10, 
          borderRadius: 4, 
          marginLeft: 6, 
          marginRight: 6, 
          marginTop: 3, 
          marginBottom: 0 }} 
      />
    );
  }

  renderTouchStart = (e) => {
    // this.setState({ 
    //   startX: e.nativeEvent.locationX,
    // });
  }

  renderTouchEnd = (e) => {
    // this.setState({ 
    //   endX: e.nativeEvent.locationX,    
    // });
  }

    // Swiper 滑動成功更換頁面觸發此方法
    renderMomentEnd = () => {
        //const { startX, endX } = this.state;

        //if (startX - endX > 0) {
            // console.log('swipe to left');
            // Animated.spring(animation.x, {
            //   toValue: this.width
            // }).start();
        //} else if (startX - endX < 0) {
            // console.log('swipe to right');
            // Animated.spring(animation.x, {
            //   toValue: 0
            // }).start();
        //}
    }

  renderRankingSwiper = (fiveRanking) => {
    return (
      fiveRanking.map((value, index) => {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', position: 'relative' }} key={index}>
          <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('MovieDetail', {
              enCity: 'TwRanking', 
              cnName: value.cnName
            })}
          >
            <ImageBackground 
              source={{ uri: value.photoHref }} 
              style={{ flex: 1, width, height: null }} 
            >
              <View style={{ backgroundColor: 'rgba(0,0,0,.2)' }}>
                <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 5 }}>
                  <View>
                    <Text style={styles.rankNum}>{`${index + 1}`}</Text>
                  </View>
                  <View style={{ marginLeft: 8, marginTop: 5, flexDirection: 'column' }}>
                    <Text style={styles.rankTiTle}>{value.cnName}</Text>
                    <Text style={styles.rankSubTitle}>{value.enName}</Text>
                  </View>
               </View>
                <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                  {value.movieStyle.map((v, i) => {
                    return (
                      <TouchableOpacity
                        key={i}
                        disabled={true}
                        style={styles.submit}
                        underlayColor='#fff'
                      > 
                        <Text style={styles.submitText}>{v.trim()}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <View style={{ height: 8 }} />
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        );
      })
    );
  }

  render() {
    const { ranking } = this.props;
    console.log('this.props =>', this.props);
    // 取前五名
    const fiveRanking = ranking.slice(0, 5);

    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <Swiper
          key={fiveRanking.length}  
          loop={false}
          loadMinimal={true}
          dot={this.renderDot()}
          activeDot={this.renderActiveDot()}
        >
          {this.renderRankingSwiper(fiveRanking)}
        </Swiper>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { ranking } = state.MovieListRedux;

  return { ranking };
};

const styles = StyleSheet.create({
  submit: {
    marginTop: 2,
    padding: 5,
    marginLeft: 5,
    backgroundColor: 'orange',
    borderRadius: 5,
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: '#DAA520'
  },
  submitText: {
    fontSize: 10,
    color: 'black',
    textAlign: 'center',
  },
  rankNum: {
    fontSize: 35, 
    color: 'white', 
    fontWeight: 'bold'
  },
  rankTiTle: {
    fontSize: 20, 
    color: 'white', 
    fontWeight: 'bold'
  },
  rankSubTitle: {
    fontSize: 14, 
    color: 'white', 
    fontWeight: 'bold'
  }
});

export default connect(mapStateToProps, { fetchRanking })(RankingScreen);
