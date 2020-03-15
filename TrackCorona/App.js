import React, { Component } from 'react';
import HomeScreen from './src/screens/HomeScreen';
import { createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

const bottomTabNavigator = createBottomTabNavigator(
  {
    Home:  {
      screen: HomeScreen,    
    },
    Explore: {
      screen: HomeScreen,
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
