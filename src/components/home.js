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

class Home extends Component{
  constructor(){
    super();
    this.state = {
      cities: [{city: 'San_Francisco', state: 'CA'}, {city: 'Seattle', state: 'WA'}, {city: 'Atlanta', state:'GA'}, {city: 'Sacramento', state: 'CA'}, {city: 'Austin', state: 'TX'}]
    }
  } 

  render(){
    return (
      <ScrollView style={styles.container}>
        {this._getCities()}
      </ScrollView>
    )
  };

  _getCities(){
    let cities = [];
    for(var i = 0; i < this.state.cities.length; i++){
      cities.push(<City key={i} state={this.state.cities[i]['state']} city={this.state.cities[i]['city']} navigator={this.props.navigator} />)
    }
    return cities;
  }

};

class City extends Component{
  //State
  constructor(){
    super();
    this.state = {
      displayName: '',
      image: '',
      temp: '',
      weather: ''
    }
  }

  //Components
  componentWillMount(){
    console.log(this.props.city);
    return fetch('https://api.wunderground.com/api/42a7c3fafb4ed6ff/conditions/q/'+this.props.state+'/'+this.props.city+'.json')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          displayName: responseJson['current_observation']['display_location']['city'],
          image: responseJson['current_observation']['icon_url'],
          temp: responseJson['current_observation']['temperature_string'],
          weather: responseJson['current_observation']['weather']
        })
      })
      .catch((error) => {
        this.setState({
          displayName: 'Currently Unavaliable',
          image: 'Currently Unavaliable',
          temp: 'Currently Unavaliable',
          weather: 'Currently Unavaliable'
        })
        //console.error(error);
      });
  }

  //render
  render(){
    return (
      <View style={styles.weather}>
        <Text>Current weather for {this.state.displayName}, {this.props.state}</Text>
        <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {justifyContent: 'space-between'}]}>
          <Image style={{width: 50, height: 50}} source={{uri: this.state.image}} />
          <Text>{this.state.weather}</Text>
          <Text>{this.state.temp}</Text>
        </View>
        <Text onPress={this._onPress.bind(this)}>Get 10 Day Forecast</Text>
      </View>
    )
  }

  //function
  _onPress(){
    this.props.navigator.push({
      name: 'forecast',
      passProps: {
        city: this.props.city,
        state: this.props.state,
        displayName: this.state.displayName
      }
    })
  }
}

//styles
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

module.exports = Home