import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedbackBase } from 'react-native';
import MapView from 'react-native-maps';

export default class App extends Component {
    state = {
        region: null,
        latitude:32.064639,
        longitude: 34.773554,
        typeOfPoint: 'myLocation',
        counter: 0
      
      }
      constructor(props){
          super(props);
          this.onRegionChange = this.onRegionChange.bind(this);
          this.state.latitude = this.props.latitude  || 32.064639 ;
          this.state.longitude = this.props.longitude || 34.773554  ;
          if (this.props.latitude){
            this.state.region = {latitude:this.state.latitude,longitude:this.state.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01};
          }
          this.state.typeOfPoint = this.props.typeOfPoint;
      }
      componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.latitude != prevProps.latitude || this.props.longitude != prevProps.longitude  ) {
          var newState = { latitude: this.props.latitude, longitude: this.props.longitude,typeOfPoint:this.props.typeOfPoint }
          if (this.state.region == null || this.props.typeOfPoint != prevProps.typeOfPoint){
            console.log("region should change");
            newState.region = { latitude: this.props.latitude, longitude: this.props.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 }
          }
          
          this.setState(newState);
        }
      }
      onRegionChange = function(region) {
          this.setState({region: region});
          console.log("region set")
      }
    render (){
      let titleOfPoint = this.state.typeOfPoint == 'myLocation' ? 'מיקומך הנוכחי' : 'נקודת החשיפה';
      let colorOfPoint = this.state.typeOfPoint == 'myLocation' ? 'blue' : 'red';
        var markers = [ {
            title: titleOfPoint,
            coordinates: { latitude: this.state.latitude, longitude: this.state.longitude },
            tracksInfoWindowChanges:true,
            pinColor: colorOfPoint
          }]
          
  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={this.state.region} onRegionChangeComplete={this.onRegionChange}>
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