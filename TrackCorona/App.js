import React, { Component } from 'react';
import HomeScreen from './src/screens/HomeScreen';
import Navigator from './src/components/Navigator';
import { Text, View, TouchableOpacity, Alert } from 'react-native';


export default class App extends Component {
  render(){
    return(
      <View style={{flex:1}}>
        <View style={{flex:1}}>
        </View>
        <View style={{flex:8}}>
          <HomeScreen/>
        </View>
        <View style={{flex:1}}>
          <Navigator/>
        </View>
      </View>
        
    );
  }
}
