import React, { Component } from 'react';
import HeaderTitle from './src/components/Header';
import HeaderActions from './src/components/HeaderActions';
import { View, Text } from 'react-native';
import Navigator from './src/components/Navigator';
import FindMe from './src/components/FindMe';
import * as Device from 'expo-device';
import { serverUrl } from './src/consts/constants';

console.disableYellowBox = true;

export default class App extends Component {
  state = {
    userName: Device.deviceName,
    //isCarrier: false,
    status: 0,
    dateOfDiagnosis: new Date().toLocaleString("en-US", { timeZone: "Asia/Jerusalem" }),
  }
    constructor(props) {
      super(props);
      this.getUserData = this.getUserData.bind(this);
      this.getUserData();
      setInterval(() => {
        this.getUserData();
      }, 30000);
    }
    getUserData = async function () {
      let response = await fetch(serverUrl + 'getUserDetails/' + this.state.userName.replace(/\s/g, ''));
      let data = await response.json();
      if (data && data.recordset && data.recordset[0]) {
        this.setState({ status: data.recordset[0].Status,dateOfDiagnosis:data.recordset[0].Datetime})
        console.log(data.recordset[0].Status);
      }
    }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#333333' }}>
        {/* Header Title */}
        <View style={{ flex:5 }}>
            <HeaderTitle />
        </View>
        {/* Header Status and Actions */}
        <View style={{ flex: 3, justifyContent: 'center', alignItems: "center", backgroundColor: '#333333' }}>
          <HeaderActions userName={this.state.deviceName} status={this.state.status} dateOfDiagnosis={this.dateOfDiagnosis} />
        </View>
        <View style={{ flex: 9, justifyContent: 'center', alignItems:'center' }}>
        {/* <MapHealthMinistry/> */}
          <View style={{height: '90%', width: 350, justifyContent: 'center', alignItems: "center", backgroundColor: 'white', borderRadius: 25  }}>
           <View style={{width: 320, height:'90%'}}>
              <FindMe/>
            </View> 
          </View>
        </View>
        <View style={{ flex: 2, justifyContent: 'center' }}>
          <Navigator />
        </View>

      </View>
    );
  }
}
