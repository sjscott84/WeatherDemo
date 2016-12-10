'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image
} from 'react-native';

class Forecast extends Component{
  constructor(){
    super();
    this.state = {
      data: []
    }
  }

  componentWillMount(){
    let forecasts = [];
    return fetch('https://api.wunderground.com/api/42a7c3fafb4ed6ff/forecast10day/q/'+this.props.state+'/'+this.props.city+'.json')
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson['forecast']['simpleforecast']);
      let data = responseJson['forecast']['simpleforecast']['forecastday'];
      console.log(data);
      for(var i = 0; i<data.length; i++){
        forecasts.push(<Day key={i} day={data[i]['date']['weekday']} image={data[i]['icon_url']} weather={data[i]['conditions']} low={data[i]['low']['fahrenheit']} high={data[i]['high']['fahrenheit']} />);
      }
      this.setState({data: forecasts})
      })
      .catch((error) => {
        this.setState({data: <Text>Forecast currently unavailable</Text>})
        //console.error(error);
      });
  }

  render(){
    return (
      <ScrollView style={styles.container}>
        <View style={[styles.weather, {flexDirection: 'row'}, {justifyContent: 'space-between'}]}>
          <Text onPress={this._onPressBack.bind(this)}>Back</Text>
          <Text>{this.props.displayName}, {this.props.state}</Text>
        </View>
        {this.state.data}
      </ScrollView>
    )
  };

  _onPressBack(){
    this.props.navigator.pop();
  }
};

class Day extends Component {
  render(){
    return(
      <View style={styles.weather}>
        <Text>{this.props.day}</Text>
        <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {justifyContent: 'space-between'}]}>
          <View style={{flex: 2}}>
            <Image style={{width: 50, height: 50}} source={{uri: this.props.image}} />
          </View>
          <Text style={{flex: 2}}>{this.props.weather}</Text>
          <Text style={{flex: 1}}>Low: {this.props.low}</Text>
          <Text style={{flex: 1}}>High: {this.props.high}</Text>
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(229,234,236)',
    paddingTop: 30
  },
  weather: {
    backgroundColor: 'rgb(255,255,255)',
    justifyContent: 'flex-start',
    margin: 5,
    marginBottom: 0,
    borderColor: 'rgb(229,234,236)',
    borderWidth: 1,
    padding: 5
  }
});

module.exports = Forecast