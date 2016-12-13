# WeatherDemo
A very basic weather app to demonstrate React Native

## Setting up React Native
Follow the Facebook instructions for setting up React Native:  
https://facebook.github.io/react-native/docs/getting-started.html#content

## Wunderground Key
You will need to get a free developer key from Weather Underground. Below is the link:
https://www.wunderground.com/weather/api/

Save this key as a string to state.key in both src/components/home.js and src/components/forecast.js.    
`constructor(){  
      super();  
      this.state = {  
        data: [],  
        key: ''\\Your key here  
      } 
  }`


## To Run Application Locally
Clone this repo locally, in terminal cd into project and use command react-native run-ios (or react-native run-android if testing on android).

