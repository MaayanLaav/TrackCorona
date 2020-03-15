import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
export default class HelpScreen extends Component {
   
      render() {
        
        return (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text> כאן יונגש למשתמש אופציות של שימוש במידע ממקור חיצוני ודיווח למוקד חיצוני, כמו קישור לטופס הזנה באתר משרד הבריאות או לחצן לחיוג מהיר למוקד משרד הבריאות </Text>
          </View>
        );
      }
}