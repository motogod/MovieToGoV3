/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers';
import MainRouter from './src/navigator/Main/MainRouter';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default class App extends Component {
  render() {
    // 正式版 移除 console.log
    if (!__DEV__) {
      console.log = () => {};
    }

    const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(ReduxThunk)));

    return (
      <Provider store={store}>
        <MainRouter />
      </Provider>
    );
  }
}
