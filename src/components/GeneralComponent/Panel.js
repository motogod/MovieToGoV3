import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Image, Animated } from 'react-native';

class Panel extends Component {
  constructor(props) {
    super(props);
    console.log('start1');
    this.icons = {
      up: require('../../assets/img/panel_up_arrow.png'),
      down: require('../../assets/img/panel_down_arrow.png')
    };
    console.log('start2');
    this.state = {
      title: props.title,
      expanded: true,
      animation: new Animated.Value(),
      maxHeight: '',
      minHeight: ''
    };
    console.log('start3');
  }
  
  setMaxHeight(event) {
    console.log('Max event.nativeEvent.layout.height =>', event.nativeEvent.layout.height);
    if (this.state.maxHeight === '') {
        this.setState({
        maxHeight: event.nativeEvent.layout.height
        });
    }
  }

  setMinHeight(event) {
    console.log('Min event.nativeEvent.layout.height =>', event.nativeEvent.layout.height);
    this.setState({
      minHeight: event.nativeEvent.layout.height
    });
  }

  toggle() {
    const initialValue = this.state.expanded ? 
    this.state.maxHeight + this.state.minHeight : this.state.minHeight;
    const finalValue = this.state.expanded ? 
    this.state.minHeight : this.state.maxHeight + this.state.minHeight;

    this.setState({
      expanded: !this.state.expanded
    });
    console.log('initialValue', initialValue);
    console.log('finalValue', finalValue);
    this.state.animation.setValue(initialValue);
    Animated.spring(
      this.state.animation,
      {
        toValue: finalValue
      }
    ).start();
  }

  render() {
    const { minHeight, maxHeight, toggle } = this.state;
    let icon = this.icons['down'];

    if (this.state.expanded) {
      icon = this.icons['up'];
    }

    let theHeight = 0;
    if (toggle) {
      theHeight = maxHeight;
    } else {
      theHeight = minHeight;
    }
    // console.log('this.state.expanded =>', this.state.expanded);
    // console.log('this.state.animation =>', this.state.animation);
    return (
      <Animated.View style={[styles.container, { height: this.state.animation._value ? theHeight : 50 }]}>
        <View style={styles.titleContainer} onLayout={this.setMinHeight.bind(this)}>
          <Text style={styles.title}>{this.state.title}</Text>
          <TouchableHighlight
            style={styles.button}
            onPress={this.toggle.bind(this)}
            underlayColor='#f1f1f1'
          >
            <Image 
              style={styles.buttonImage}
              source={icon}
            />
          </TouchableHighlight>
        </View>

        <View style={styles.body} onLayout={this.setMaxHeight.bind(this)}>
          {this.props.children}
        </View>
        <Text>{this.props.children}</Text>
      </Animated.View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: '#fff',
    margin: 8,
    overflow: 'hidden'    
  },
  titleContainer: {
    flexDirection: 'row'
  },
  title: {
    flex: 1,
    padding: 10,
    color: '#2a2f43',
    fontWeight: 'bold'
  },
  button: {

  },
  buttonImage: {
    width: 15,
    height: 10,
    margin: 10
  },
  body: {
    padding: 10,
    paddingTop: 0
  }  
};

export default Panel;
