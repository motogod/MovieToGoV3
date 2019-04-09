import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, SafeAreaView } from 'react-native';

class TheaterScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          <Text>戲院我在這</Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default TheaterScreen;
