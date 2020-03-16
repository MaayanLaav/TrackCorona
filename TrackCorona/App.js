import React, { Component } from 'react';
import HomeScreen from './src/screens/HomeScreen';
import HeaderTitle from './src/components/Header';
import HeaderActions from './src/components/HeaderActions';
import MapScreen from './src/screens/MapScreen';
import HelpScreen from './src/screens/HelpScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { View,Text } from 'react-native';
import Navigator from './src/components/Navigator';
// const bottomTabNavigator = createBottomTabNavigator(
//   {
//     Home:  {
//       screen: HomeScreen,    
//     },
//     Map: {
//       screen: MapScreen,
//     },
//     Help: {
//       screen: HelpScreen,
//     },
//     Settings: {
//       screen: SettingsScreen,
//     },
//   },
//   {
//     initialRouteName: 'Home',
//     tabBarOptions: {
//       activeTintColor: '#eb6e3d'
//     }
//   }
// );
// const AppContainer = createAppContainer(bottomTabNavigator);

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {/* Header Title */}
        <View style={{ flex: 2 }}>
        <View style={{ flex: 17 }}>
        <HeaderTitle />
        </View>
        </View>
        {/* Header Status and Actions */}
        <View style={{ flex: 2, justifyContent: 'center',backgroundColor:'red' }}>
          <HeaderActions />
        </View>
        <View style={{ flex: 10, justifyContent: 'center' }}>
        </View>
        <View style={{ flex: 2, justifyContent: 'center' }}>
        <Navigator/>
        </View>
        
      </View>
    );
  }
}
