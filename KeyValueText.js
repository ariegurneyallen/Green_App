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
      <View>
        <Text style={styles.text}>
        <Text style={styles.label}>{this.props.label}</Text>:{this.props.content}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#95BCF2',
    overflow: 'visible',
    borderRadius: 10,
  },

  text: {
    fontSize: 15,
    color: '#ffffff',
    lineHeight: 25
  },

  label: {
    fontFamily: 'OpenSans-Bold'
  }

});
