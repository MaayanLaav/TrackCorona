import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedbackBase } from 'react-native';
import MapView from 'react-native-maps';

export default class App extends Component {
    state = {
        region: null,
        latitude:32.064639,
        longitude: 34.773554
      
      }
      constructor(props){
          super(props);
      }
      componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.latitude !== prevProps.latitude || this.props.longitude !== prevProps.longitude  ) {
          this.setState({ latitude: this.props.latitude, longitude: this.props.longitude })
          if (this.state.region == null){
               let reg = { latitude: this.props.latitude, longitude: this.props.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 }
               this.setState({region:reg});
          }
        }
      }

    render (){
        var markers = [ {
            title: 'מיקומך הנוכחי',
            coordinates: { latitude: this.state.latitude, longitude: this.state.longitude },
            tracksInfoWindowChanges:true
          }]
          
  return (
    <View style={styles.container}>
      <MapView style={styles.map}  initialRegion={this.state.region}>
        {markers.map(marker => (
          <MapView.Marker
            coordinate={marker.coordinates}
            title={marker.title}
            description={marker.description}
            pinColor={marker.pinColor}
          />
        ))}
      </MapView>
    </View>
  );
}
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: "center"
  },
  map: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }
});