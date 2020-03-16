import React, { Component } from 'react';
import { Text, View, Alert, StyleSheet, Button } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';
export default class HeaderStatus extends Component {
  state = {
    status: 0,
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
    let iconName = 'heartbeat'
    switch (status) {
      case  1: {
        text = 'מעגל שני'
        //iconName = 'faHeartbeat'
      }
        break;
      case  2: {
        text = 'מעגל ראשון';
      }
        break;
      case 3: {
        text = 'נושא את הנגיף'
      }
        break;
      default: {
      }
    }
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <FontAwesomeIcon icon= {faHeartbeat}  size={ 22} color={'orange'} />
        <Text> {text} </Text>
      </View>
    );
  }
}