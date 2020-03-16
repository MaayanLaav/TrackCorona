import React, { Component } from 'react';
import { Text, View, Alert,StyleSheet,Button } from 'react-native';
export default class HeaderStatus extends Component {
  state = {
    status: 0,
  };
  constructor(props) {
    super(props);
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.status !== prevProps.status) {
     this.setState({status: this.props.status})
    }
  }
    render() {
      let status = this.props.status
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text> {status} </Text>
        </View>
      );
    }
}