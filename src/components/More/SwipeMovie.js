import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image, Dimensions, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import Swipeable from 'react-native-swipeable';

import LeftArrowIcon from '../../assets/img/left_arrow.png';
import RightArrowIcon from '../../assets/img/right_arrow.png';
import DeleteIcon from '../../assets/img/delete.png';

const { width } = Dimensions.get('window');
const equalWidth = (width / 2);

class SwipeMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrowImage: LeftArrowIcon
    };
  }

  changeArrowImage = (tex) => {
    if (tex === 'open') {
      this.setState({ arrowImage: RightArrowIcon });
    } else {
      this.setState({ arrowImage: LeftArrowIcon });
    }
  }

  render() {
    const { item } = this.props;
    
    return (
      <Swipeable
        onRef={ref => { this.swipeable = ref; }}
        rightButtons={[
          <TouchableOpacity 
            onPress={() => {
              // 關閉 Swipeable
              this.swipeable.recenter();
              this.setState({ arrowImage: LeftArrowIcon });
              this.props.deleteMovie(item);
            }}
            style={[styles.rightSwipeItem, { backgroundColor: 'red' }]}
          >
            <Image source={DeleteIcon} style={{ height: 25, width: 25 }} />
          </TouchableOpacity>,
        ]}
        onRightButtonsOpenRelease={() => this.changeArrowImage('open')}
        onRightButtonsCloseRelease={() => this.changeArrowImage('close')}
      > 
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('MovieDetailPersist', {
            movieDetailPersist: item
          })}
        >
          <View style={{ padding: 15, flexDirection: 'row' }}>
            <View>
            <Image
              style={{ width: 40, height: 60, borderRadius: 10 }}
              source={{ uri: item.photoHref }}
              resizeMode='stretch'
            />
            </View>
            <View style={{ marginLeft: 8, flexWrap: 'wrap', width: equalWidth }}>
              <Text style={{ fontSize: 16, color: '#444f6c' }}>{item.cnName}</Text>
              <Text style={{ fontSize: 12, color: 'gray', marginTop: 12 }}>{item.enName}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end', alignSelf: 'center' }}>
              <Image source={this.state.arrowImage} style={{ width: 15, height: 15 }} />
            </View>
          </View>
        <View style={{ width, height: 0.5, backgroundColor: 'gray' }} />
        </TouchableOpacity>
      </Swipeable>

    );
  }
}

const styles = StyleSheet.create({
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20
 }
});

export default SwipeMovie;
