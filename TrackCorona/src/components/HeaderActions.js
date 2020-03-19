import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import CarryVirus from './CarryVirus';
import * as Device from 'expo-device';
import { serverUrl } from '../consts/constants';
import HeaderStatus from './HeaderStatus';
export default class HeaderActions extends Component {
  state = {
    userName: Device.deviceName,
    //isCarrier: false,
    status: 0,
    dateOfDiagnosis: new Date().toLocaleString("en-US", { timeZone: "Asia/Jerusalem" }),
  }
  constructor(props) {
    super(props);
    this.state.userName = this.props.userName;
    this.state.status = this.props.status;
    this.state.dateOfDiagnosis = this.props.dateOfDiagnosis;
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.status !== prevProps.status) {
      console.log('HeaderStatus:' + this.props.status);
      this.setState({ status: this.props.status })
    }
  }
  updateStatus = function (updatedStatus) {
    this.setState({ status: updatedStatus,dateOfDiagnosis: new Date().toLocaleString("en-US", { timeZone: "Asia/Jerusalem" })});
  }
  render() {
    let status = this.state.status;
    let isCarrier = status == 3;
    return (
      <View style={{ flex: 1, width: 320, marginTop: -30, borderRadius:25, justifyContent: 'center', alignItems: "center" ,backgroundColor: "white"}}>
        <View style={{ flex: 3}} >
          <HeaderStatus status={status} />
        </View>
        <View style={{ flex:2 }} >
          <CarryVirus isCarrier={isCarrier} callbackFunc={this.updateStatus} />
        </View>
      </View>
    );
  }
}