import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as Device from 'expo-device';
import {serverUrl} from '../consts/constants';
import PakarMap from '../components/PakarMap';
export default class FindMe extends Component {
    state = {
        longitude: null,
        latitude:null,
        errorMessage: null,
        deviceName: Device.deviceName,
    };
    constructor(props) {
        super(props);
        this.findCurrentLocationAsync();
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
            this.setState({ longitude: location.coords.longitude, latitude:location.coords.latitude });
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
                  deviceName: this.state.deviceName.replace(/\s/g, '')
                }),
              });
        }
    };
    render() {
        var latToForward = this.state.latitude;
        var lonToForward = this.state.longitude;
        console.log('latToForward: ' + latToForward);
        console.log('lonToForward: ' + lonToForward);
        return (
            <View style={{flex:1}}>
                <PakarMap latitude = {latToForward} longitude={lonToForward}/>
            </View>
        );
    }
}
