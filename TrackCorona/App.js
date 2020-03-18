import React, { Component } from 'react';
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Navigator from './src/components/Navigator';
import FindMe from './src/components/FindMe';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'


const Stack = createStackNavigator();
console.disableYellowBox = true;

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#333333' }}>
        <View style={{ flex: 19 }}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
              <Stack.Screen name="Map" component={MapScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
          </NavigationContainer>
        </View>
        <FindMe />
      </View>
    );
  }
}
