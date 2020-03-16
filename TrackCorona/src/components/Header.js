import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert,Image } from 'react-native';
export default class HeaderTitle extends Component {
   
      render() {
        return (
          <View style={{ flex: 1,flexDirection: 'row',justifyContent:'center'}}>
        <Image
          style={{width: 50, height: 50}}
          source={require('../assests/images/pakar.png')}
          />
              <View style={{ flex:1,backgroundColor:'#578feb',flexDirection: 'row',justifyContent:'center'}}>
              <Text style={{color:'white',fontWeight:'bold',fontSize:40,fontStyle:'italic'}}>יחד</Text>
              </View>
          </View>
        );
      }
}
