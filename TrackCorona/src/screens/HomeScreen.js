import React, { Component } from 'react';
import { Button, Text, View, TouchableOpacity } from 'react-native';
import HeaderTitle from '../components/Header';
import HeaderActions from '../components/HeaderActions';
import Navigator from '../components/Navigator';
import MapScreen from '../screens/MapScreen';
import * as Device from 'expo-device';
import { serverUrl } from '../consts/constants';

export default class HomeScreen extends Component {
  state = {
    userName: Device.deviceName,
    isCarrier: false,
    status: 0,
  }
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#333333" }}>
        <View style={{ flex: 5 }}>
          <HeaderTitle />
        </View>
        {/* Header Status and Actions */}
        <View style={{ flex: 3, justifyContent: 'center', alignItems: "center", }}>
          <HeaderActions />
        </View>
        <View style={{ flex: 9, justifyContent: 'center', alignItems: "center", }}>
        <Button
          title="הצג את מפת המסלול שלי"
          onPress={() => this.props.navigation.navigate('Map')}
        />
        </View>
      </View>
    );
  }
}
