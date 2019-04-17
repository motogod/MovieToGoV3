/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import reducers from './src/reducers';
import MainRouter from './src/navigator/Main/MainRouter';
import WelcomeRouter from './src/navigator/Welcome/WelcomeRouter';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default class App extends Component {
  render() {
    // 正式版 移除 console.log
    if (!__DEV__) {
      console.log = () => {};
    }

    const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(ReduxThunk)));
    // redux persist setting
    const persistor = persistStore(store);

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <WelcomeRouter />
        </PersistGate>
      </Provider>
    );
  }
}
