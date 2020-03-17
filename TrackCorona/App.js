import React, { Component } from 'react';
import HomeScreen from './src/screens/HomeScreen';
import HeaderTitle from './src/components/Header';
import HeaderActions from './src/components/HeaderActions';
import MapScreen from './src/screens/MapScreen';
import HelpScreen from './src/screens/HelpScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { View, Text } from 'react-native';
import Navigator from './src/components/Navigator';
import FindMe from './src/components/FindMe';
import MapHealthMinistry from './src/components/MapHealthMinistry';
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
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#333333' }}>
        {/* Header Title */}
        <View style={{ flex:5 }}>
            <HeaderTitle />
        </View>
        {/* Header Status and Actions */}
        <View style={{ flex: 3, justifyContent: 'center', alignItems: "center", backgroundColor: '#333333' }}>
          <HeaderActions />
        </View>
        <View style={{ flex: 9, justifyContent: 'center' }}>
        <MapHealthMinistry/>
          <FindMe/>
        </View>
        <View style={{ flex: 2, justifyContent: 'center' }}>
          <Navigator />
        </View>

      </View>
    );
  }
}
