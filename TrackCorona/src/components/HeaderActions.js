import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import CarryVirus from './CarryVirus';
import * as Device from 'expo-device';
import { serverUrl } from '../consts/constants';
import HeaderStatus from './HeaderStatus';
export default class HeaderActions extends Component {
  state = {
    userName: Device.deviceName,
    // isCarrier: false,
    status: 0,
  }
  constructor(props) {
    super(props);
    this.getUserData = this.getUserData.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.getUserData();
    setInterval(() => {
      this.getUserData();
    }, 30000);

  }
  getUserData = async function () {
    let response = await fetch(serverUrl + 'getUserDetails/' + this.state.userName);
    let data = await response.json();
    if (data && data.recordset && data.recordset[0]) {
      this.setState({ status: data.recordset[0].Status })
      console.log(data.recordset[0].Status);
    }
  }
  updateStatus = function (updatedStatus) {
    this.setState({ status: updatedStatus });
  }
  render() {
    let status = this.state.status;
    let isCarrier = status == 3;
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
          <HeaderStatus status={status} />
          <CarryVirus isCarrier={isCarrier} callbackFunc={this.updateStatus} />
      </View>
    );
  }
}