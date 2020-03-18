import React, { Component } from 'react';
import { Text, View, Alert, StyleSheet, Button } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeartbeat, faExclamationTriangle,faExclamationCircle, faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';
export default class HeaderStatus extends Component {
  state = {
    status: 0,
    dateOfDiagnosis:new Date().toLocaleString("en-US", { timeZone: "Asia/Jerusalem" })
  };
  constructor(props) {
    super(props);
    this.state.status = this.props.status
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.status !== prevProps.status) {
      console.log('HeaderStatus:' + this.props.status);
      this.setState({ status: this.props.status })
    }
  }
  render() {
    let status = this.props.status
    let text = 'בריא'
    let iconName = faHeartbeat;
    let colorIcon = 'green';
    switch (status) {
      case  1: {
        text = 'נחשפת לאזרחים בעלי פוטנציאל להיות נשאים של הנגיף, הנך מתבקש להזהר ולהקטין חשיפתך'
        dateText = 
        iconName = faExclamationTriangle
        colorIcon = 'orange';
      }
        break;
      case  2: {
        text = 'נחשפת לנגיף הקורונה, הנך מתבקש להכנס לבידוד ולדווח למשרד הבריאות';
        iconName = faExclamationCircle;
        colorIcon = 'red'
      }
        break;
      case 3: {
        text = 'נושא את הנגיף'
        colorIcon = 'red'
        iconName = faTemperatureHigh;
      }
        break;
      default: {
      }
    }
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
        <FontAwesomeIcon icon= {iconName}  size={ 40} color={colorIcon} />
        <Text style={{fontSize: 16}}> {text} </Text>
      </View>
    );
  }
}