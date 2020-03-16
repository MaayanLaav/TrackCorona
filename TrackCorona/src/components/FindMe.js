import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as Device from 'expo-device';
import {serverUrl} from '../consts/constants';
export default class FindMe extends Component {
    state = {
        location: null,
        errorMessage: null,
        deviceName: Device.deviceName,
    };
    constructor(props) {
        super(props);
        setInterval(() => {
           this.findCurrentLocationAsync()
        }, 10000);
    }
    findCurrentLocationAsync = async function () {
        let { status } = await Permissions.askAsync(Permissions.LOCATION)
        if (status !== 'granted') {
            console.log('permission denied')
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }
        else {
            let location = await Location.getCurrentPositionAsync({});
            console.log('Longitude ' + location.coords.longitude)
            console.log('Latitude ' + location.coords.latitude)
            console.log('TimeStamp ' + location.timestamp)
            this.setState({ location });
            fetch(serverUrl + 'insertLocation', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  longitude: location.coords.longitude,
                  latitude: location.coords.latitude,
                  timestamp: location.timestamp,
                  deviceName: this.state.deviceName
                }),
              });
        }
    };
    render() {
        let text = '';
        let longit = '';
        let latit = '';
        let deviceName = this.state.deviceName ? this.state.deviceName : '';
        if (this.state.errorMessage) {
            text = this.state.errorMessage;
        }
        else if (this.state.location) {
            text = JSON.stringify(this.state.location);
            longit = this.state.location.coords.longitude
            latit = this.state.location.coords.latitude
        }
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>שלום {deviceName} </Text>
                <Text>קו אורך: {longit}</Text>
                <Text>קו רוחב: {latit}</Text>
            </View>
        );
    }
}
