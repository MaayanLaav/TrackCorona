import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert, Image } from 'react-native';
export default class HeaderTitle extends Component {

  render() {
    return (
      <View style={{ flex: 1, paddingBottom:10, backgroundColor: '#0165a8', justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={{ width: 50, height: 50 }}
          source={require('../assests/images/pakar.png')}
        />
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 40 }}> פקע"ר קורונה</Text>
      </View>
    );
  }
}
