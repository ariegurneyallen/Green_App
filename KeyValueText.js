import React, { Component } from 'react'

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Button,
  AsyncStorage,
  TouchableHighlight,
} from 'react-native';


export default class KeyValueText extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Text >
        {this.props.label}:{this.props.content}
      </Text>
    )
  }
}
