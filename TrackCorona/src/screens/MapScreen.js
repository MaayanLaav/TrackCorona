import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView from 'react-native-maps';
import Navigator from '../components/Navigator';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: "center",
  },
  map: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }
});

export default class MapScreen extends Component {


  state = {
    // markers: [{
    //   title: 'hello',
    //   description: 'description',
    //   coordinates: { latitude: 32.098260, longitude: 34.525513 },
    //   pinColor: 'blue'
    // },
    markers: [{
      title: 'hello david',
      description: 'david description',
      coordinates: { latitude: 32.098260, longitude: 34.925513 },
      tracksInfoWindowChanges: true
    }]
  }

  render() {
    return (
      <View style={{flex:1}}>
        <View style={{ flex: 17 }}>
          <View style={styles.container}>
            <MapView style={styles.map}
              region={{ latitude: 32.098260, longitude: 34.925513, latitudeDelta: 0.01, longitudeDelta: 0.01 }}
            >
              {this.state.markers.map(marker => (
                <MapView.Marker
                  coordinate={marker.coordinates}
                  title={marker.title}
                  description={marker.description}
                  pinColor={marker.pinColor}
                />
              ))}
            </MapView>
          </View>
        </View>
        <View style={{ flex: 2, width: "100%", justifyContent: 'center' }}>
          <Navigator navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}