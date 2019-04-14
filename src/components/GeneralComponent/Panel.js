import React, { Component } from 'react';
import { View, Image, StyleSheet, Animated, Text, LayoutAnimation } from 'react-native';

import DownIcon from '../../assets/img/panel_down_arrow.png';
import UpIcon from '../../assets/img/panel_up_arrow.png';

class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /** 文字是否展開 */
      expanded: true,
      numberOfLines: null,
      /** 展開收起文字是否處於顯示狀態 */
      showExpandText: false,
      expandIcon: DownIcon,
      expandText: 'More',
      /** 是否處於測量階段 */
      measureFlag: true
    }
    this.numberOfLines = props.numberOfLines;
    /** 文字是否需要展開收起功能：（實際文字內容是否超出numberOfLines限制） */
    this.needExpand = true;
    this.measureFlag = true;
  }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }


  _onTextLayout(event) {
    if (this.measureFlag) {
      if (this.state.expanded) {
        this.maxHeight = event.nativeEvent.layout.height;
        this.setState({ expanded: false, numberOfLines: this.numberOfLines });
      } else {
        this.mixHeight = event.nativeEvent.layout.height;
        if (this.mixHeight === this.maxHeight) {
          this.needExpand = false;
        } else {
          this.needExpand = true;
          this.setState({ showExpandText: true });
        }
        this.measureFlag = false;
      }
    }
  }

  _onPressExpand() {
    if (!this.state.expanded) {
      this.setState({ 
        numberOfLines: null, 
        expandText: 'Close', 
        expandIcon: UpIcon, 
        expanded: true 
      });
    } else {
      this.setState({ 
        numberOfLines: this.numberOfLines, 
        expandText: 'More', 
        expandIcon: DownIcon, 
        expanded: false 
      });
    }
  }

  render() {
    const { numberOfLines, onLayout, expandTextStyle, ...rest } = this.props;
    const expandText = this.state.showExpandText ? (
        <Text
          style={[this.props.style, styles.expandText, expandTextStyle]}
          onPress={this._onPressExpand.bind(this)}
        >
          {/* {this.state.expandText} */}
          <Image source={this.state.expandIcon} style={{ width: 15, height: 15 }} />
        </Text>
      ) : null;
      console.log('this.props.children', this.props.children);
    return (
      <View style={{ paddingHorizontal: 18 }}>
        <Text
          letterSpacing={1}
          numberOfLines={this.state.numberOfLines}
          onLayout={this._onTextLayout.bind(this)}
          {...rest}
          >
          {this.props.children}
        </Text>
        <View style={{ marginTop: 10, alignItems: 'center' }}>
        {expandText}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  expandText: {
    color: 'blue',
    marginTop: 0
  }
});

export default Panel;
