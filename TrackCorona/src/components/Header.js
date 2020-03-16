import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert,Image } from 'react-native';
export default class HeaderTitle extends Component {
   
      render() {
        return (
          <View style={{ flex: 1,justifyContent:'center'}}>
       <View style={{flex:1}}>

       </View>
              <View style={{ flex:1,backgroundColor:'#578feb',flexDirection: 'row-reverse',justifyContent:'center',alignItems: 'center'}}>
                <Image
                style={{width: 50, height: 50}}
                source={require('../assests/images/pakar.png')}
                />
                <Text style={{color:'white',fontWeight:'bold',fontSize:40}}> TrackCorona</Text>
              </View>
          </View>
        );
      }
}
