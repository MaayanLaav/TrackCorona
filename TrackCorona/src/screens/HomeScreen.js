import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import FindMe from '../components/FindMe';
import * as Device from 'expo-device';
import CarryVirus from '../components/CarryVirus';

export default class HomeScreen extends Component {
    state = {
        userName: Device.deviceName,
        isCarrier: false,
        status: 0,
      }
      constructor(props) {
        super(props);
        this.getUserData = this.getUserData.bind(this);
        this.getUserData();
      }
      getUserData = async function () {
        console.log('getUserDetails');
        let response = await fetch('http://192.168.1.166:5000/getUserDetails/' + this.state.userName);
        let data = await response.json();
        if (data && data.recordset && data.recordset[0] && data.recordset[0].Status == 3) {
          this.setState({ isCarrier: true })
        }
      }
      render() {
        let isCarrier = this.state.isCarrier;
        return (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <CarryVirus isCarrier={isCarrier} />
            <FindMe/>
          </View>
        );
      }
}
