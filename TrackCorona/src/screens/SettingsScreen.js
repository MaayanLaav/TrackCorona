import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
export default class SettingsScreen extends Component {
   
      render() {
        return (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>כאן יוצג למשתמש הגדרות כגון שימוש באפליקציה כגון כל כמה זמן הוא רוצה שידגמו ממנו מיקום, מאיזה מרחק הוא רוצה לקבל התראה שהוא קרוב לנקודה שבה הנגיף יכול להמצא ועוד. </Text>
          </View>
        );
      }
}