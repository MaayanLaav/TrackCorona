import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert,StyleSheet,Button } from 'react-native';
import * as Device from 'expo-device';

const styles = StyleSheet.create({
    disableInfectedButton: {
      color: 'red',
      fontWeight: 'bold',
      fontSize:20,
    },
    enableInfectedButton: {
      color: 'black',
      fontWeight: 'bold',
      fontSize:10,
    },
  });

export default class CarryVirus extends Component {
    state = {
        deviceName: Device.deviceName,
        disable: false,
        text: 'אני מצהיר שנדבתייי בנגיף'
    };
    constructor(props) {
        super(props);
        this.setUserAsCarrier = this.setUserAsCarrier.bind(this);
    }
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.isCarrier !== prevProps.isCarrier) {
          if (this.props.isCarrier){
              this.setState({
                disable: true,
                text:'אני נשא קטלני של הנגיף'
              })
          }
          else{
            this.setState({
                disable: true,
                text:'אני מצהיר שנדבקתי בנגיף'
              })
          }
        }
      }
    setUserAsCarrier = async function () {
        Alert.alert(
            'התראה',
            'האם אתה בטוח שברצונך להצהיר שהינך נשא של נגיף הקורונה?',
            [
              {
                text: 'ביטול',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'כן', onPress: () => {
                fetch('http://192.168.1.166:5000/carryVirus', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        deviceName: this.state.deviceName,
                        datetime: new Date().toLocaleString("en-US", {timeZone: "Asia/Jerusalem"})
                    }),
                }).then((response) => {this.setState({
                    disable: true,
                    text:'אני נשא של הנגיף'
                })}
                ).catch((err) => console.error(err));
              }
            },
            ],
            {cancelable: false},
          );
    };
    render() {
        let text = this.state.text;
        let disabledButton = this.state.disable;
        let navigation = this.props.navigation;
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity onPress={this.setUserAsCarrier} disabled={disabledButton}>
                    <Text style={disabledButton ? styles.disableInfectedButton : styles.enableInfectedButton} > {text} </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
