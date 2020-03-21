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
    dateOfDiagnosis: null,
    dateOfFirstExposure: null,
  }
  constructor(props) {
    super(props);
    this.updateStatus = this.updateStatus.bind(this);
    this.state.userName = this.props.userName;
    this.state.status = this.props.status;
    this.state.dateOfDiagnosis = this.props.dateOfDiagnosis;
    this.state.dateOfFirstExposure = this.props.dateOfFirstExposure;
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.status !== prevProps.status || this.props.dateOfDiagnosis != prevProps.dateOfDiagnosis) {
      this.setState({ status: this.props.status, dateOfDiagnosis: this.props.dateOfDiagnosis, dateOfFirstExposure: this.props.dateOfFirstExposure })
    }
  }
  updateStatus = function (updatedStatus) {
    this.setState({ status: updatedStatus });
  }
  render() {
    let status = this.state.status;
    let isCarrier = status == 3;
    let dateOfDiagnosis = this.state.dateOfDiagnosis;
    return (
      <View style={{ flex: 1, width: 350, marginTop: -30, borderRadius: 25, justifyContent: 'center', alignItems: "center", backgroundColor: "white" }}>
        <View style={{ flex: 3 }} >
          <HeaderStatus status={status} dateOfDiagnosis={dateOfDiagnosis} dateOfFirstExposure={this.state.dateOfFirstExposure} />
        </View>
        <View style={{ flex: 2 }} >
          {/* <CarryVirus isCarrier={isCarrier} callbackFunc={this.updateStatus} /> */}
        </View>
      </View>
    );
  }
}