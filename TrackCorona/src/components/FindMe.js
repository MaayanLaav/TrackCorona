import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as Device from 'expo-device';
import {serverUrl} from '../consts/constants';
import PakarMap from '../components/PakarMap';
import { ThemeColors } from 'react-navigation';
export default class FindMe extends Component {
    state = {
        longitude: null,
        latitude:null,
        errorMessage: null,
        deviceName: Device.deviceName,
        infectedLat: null,
        infectedLon:null,
        typeOfPoint:'myLocation'
    };
    constructor(props) {
        super(props);
        this.state.infectedLat = this.props.infectedLat;
        this.state.infectedLon = this.props.infectedLon;
        console.log(this.state.infectedLat);
        this.findCurrentLocationAsync();
        setInterval(() => {
           this.findCurrentLocationAsync()
        }, 20000);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.infectedLat != this.props.infectedLat || prevProps.infectedLon != this.props.infectedLon){
            this.setState({infectedLat:this.props.infectedLat, infectedLon: this.props.infectedLon,typeOfPoint:'infectedPoint'});
        }
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
    changeMyTypeOfPoint = function(newType){
        this.setState({typeOfPoint: newType});
    }
    render() {
        var latToForward = this.state.latitude;
        var lonToForward = this.state.longitude;
        if (this.state.infectedLat && this.state.typeOfPoint == 'infectedPoint'){
            latToForward = this.state.infectedLat
            lonToForward = this.state.infectedLon
        }
        console.log(this.state.typeOfPoint);
        return (
            <View style={{flex:1}}>
                <PakarMap latitude={latToForward} longitude={lonToForward} typeOfPoint={this.state.typeOfPoint}/>
            </View>

        );
    }
}
