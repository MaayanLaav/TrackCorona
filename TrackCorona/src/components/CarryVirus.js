import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert,StyleSheet,Button } from 'react-native';
import * as Device from 'expo-device';
import {serverUrl} from '../consts/constants';

const styles = StyleSheet.create({
    disableInfectedButton: {
      height: 30, 
      width: 130,  
      backgroundColor:"#bababa", 
      justifyContent: "center", 
      alignItems: "center",
      borderRadius: 50
    },
    enableInfectedButton: {
      height: 30, 
      width: 130,  
      backgroundColor:"#ff5f2e", 
      justifyContent: "center", 
      alignItems: "center",
      borderRadius: 50
    },
    text: {
      color: 'white',
      fontWeight: 'bold'
    }

  });

export default class CarryVirus extends Component {
    state = {
        deviceName: Device.deviceName,
        disable: false,
        text: "מצהיר שנדבקתי"
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
                text:'הצהרתי שנדבקתי'
              })
          }
          else{
            this.setState({
                disable: false,
                text:"מצהיר שנדבקתי"
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
               
                console.log(serverUrl);
                fetch(serverUrl+ 'carryVirus', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        deviceName: this.state.deviceName.replace(/\s/g, ''),
                        datetime: new Date().toLocaleString("en-US", {timeZone: "Asia/Jerusalem"})
                    }),
                }).then((response) => {
                  this.props.callbackFunc(3);
                  this.setState({
                    disable: true,
                    text:"הצהרתי שנדבקתי"
                    
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
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity style= {disabledButton ? styles.disableInfectedButton : styles.enableInfectedButton} onPress={this.setUserAsCarrier} disabled={disabledButton}>
                    <Text style={styles.text} > {text} </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
