import React, { Component } from 'react';
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';
import HelpScreen from './src/screens/HelpScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

const bottomTabNavigator = createBottomTabNavigator(
  {
    Home:  {
      screen: HomeScreen,    
    },
    Map: {
      screen: MapScreen,
    },
    Help: {
      screen: HelpScreen,
    },
    Settings: {
      screen: SettingsScreen,
    },
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: '#eb6e3d'
    }
  }
);
const AppContainer = createAppContainer(bottomTabNavigator);

export default class HelloWorldApp extends Component {
  render(){
    return(
      <AppContainer/>
    );
  }
}
