'use strict'
console.disableYellowBox = true;
global.___DEV___ = false;

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
} from 'react-native';

import Home from './components/home';
import Forecast from './components/forecast';


const ROUTES = {
  home: Home,
  forecast: Forecast
}

export default class WeatherDemo extends Component {
  render() {
    return (
      <Navigator style={styles.container} initialRoute={{name:'home'}} renderScene={this._renderScene} configureScene={() => {return Navigator.SceneConfigs.FloatFromRight}}/>
    );
  };

  _renderScene(route, navigator){
    var Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} {...route.passProps}/>
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
