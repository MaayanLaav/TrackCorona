import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
export default class MapScreen extends Component {
   
      render() {
    
        return (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>כאן תוצג מפה שבו יהיה המיקום של המשתמש ולידו מיקומי הנקודות הקרובות שנגועות בנגיף </Text>
          </View>
        );
      }
}