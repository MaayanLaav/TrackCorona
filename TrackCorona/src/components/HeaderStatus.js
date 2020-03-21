import React, { Component } from 'react';
import { Text, View, Alert, StyleSheet, Button } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeartbeat, faExclamationTriangle, faExclamationCircle, faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';
export default class HeaderStatus extends Component {
  state = {
    status: 0,
    dateOfDiagnosis: null,
    dateOfFirstExposure: null
  };
  constructor(props) {
    super(props);
    this.state.status = this.props.status
    this.state.dateOfDiagnosis = this.props.dateOfDiagnosis;
    this.state.dateOfFirstExposure = this.props.dateOfFirstExposure;
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.status != prevProps.status) {
      this.setState({ status: this.props.status,dateOfDiagnosis: this.props.dateOfDiagnosis, dateOfFirstExposure: this.props.dateOfFirstExposure  });
    }
  }
  render() {
    let isolationDate = '';
    let exposureTime = '';
    let status = this.props.status
    let text = 'בריא'
    let iconName = faHeartbeat;
    let colorIcon = 'green';
    switch (status) {
      case 1: {
        text = 'נחשפת לאזרחים בעלי פוטנציאל להיות נשאים של הנגיף, הנך מתבקש להזהר ולהקטין חשיפתך'
        iconName = faExclamationTriangle
        colorIcon = 'orange';
        if (this.state.dateOfDiagnosis) {
          isolationDate = new Date(this.state.dateOfDiagnosis);
          isolationDate.setDate(isolationDate.getDate() + 14)
          let hours = isolationDate.getHours();
          let minutes = isolationDate.getMinutes();
          hours < 10 ? hours = '0' + hours : {};
          minutes < 10 ? minutes = '0' + minutes : {};
          isolationDate = 'תקף עד לתאריך: ' + isolationDate.getDate() + '-' + (isolationDate.getMonth() + 1) + '-' + '2020' + ' בשעה: ' + hours + ':' + minutes;
        }
      }
        break;
      case 2: {
        text = 'נחשפת לנגיף הקורונה, הנך מתבקש להכנס לבידוד ולדווח למשרד הבריאות';
        iconName = faExclamationCircle;
        colorIcon = 'red'
        console.log(this.state.dateOfFirstExposure);
        if (this.state.dateOfDiagnosis) {
          isolationDate = new Date(this.state.dateOfDiagnosis);
          let firstExposure = new Date(this.state.dateOfFirstExposure);
          let timeDiff = parseInt((isolationDate - firstExposure)) / 1000;
          let diffHours = 0;
          let diffMinutes = 0
          let diffSeconds = ''
          if (timeDiff / 3600 >= 1){
            diffHours = Math.floor(timeDiff / 3600);
                 timeDiff = timeDiff - Math.floor(timeDiff / 3600) * 3600;
                 
          }
          diffHours = diffHours > 0 ? diffHours : '00';
          if (timeDiff / 60 >= 1){
            diffMinutes = Math.floor(timeDiff / 60) >= 10 ? Math.floor(timeDiff / 60) : '0'  + Math.floor(timeDiff / 60); 
            timeDiff = timeDiff -  Math.floor(timeDiff / 60) * 60;
          }
          diffMinutes == 0 ? diffMinutes = '00' : {};  
          diffSeconds = timeDiff >= 10 ? timeDiff : '0' + timeDiff;
          exposureTime = 'משך החשיפה הינו: ' + diffHours + ':' + diffMinutes + ':' + diffSeconds;

          //isolationDate.setDate(isolationDate.getDate() + 14) - new Date().toLocaleString("en-US", { timeZone: "Asia/Jerusalem" });
          let hours = isolationDate.getHours();
          let minutes = isolationDate.getMinutes();
          hours < 10 ? hours = '0' + hours : {};
          minutes < 10 ? minutes = '0' + minutes : {};
          isolationDate = 'תאריך חשיפה: ' + isolationDate.getDate() + '-' + (isolationDate.getMonth() + 1) + '-' + '2020' + ' בשעה: ' + hours + ':' + minutes;
        }
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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <FontAwesomeIcon icon={iconName} size={40} color={colorIcon} />
        <Text style={{ fontSize: 12 }}> {text} </Text>
        <Text style={{ fontSize: 12 }}>  {isolationDate} </Text>
        <Text style= {{fontSize:12}}> {exposureTime} </Text>
      </View>
    );
  }
}