import React, { Component } from 'react'

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  AsyncStorage,
  Button,
  TouchableHighlight,
  PushNotificationIOS,
  Geolocation,
  ActivityIndicator
} from 'react-native';

import { Icon } from 'react-native-elements';


export default class Loading extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {


    return (
      <View style={styles.information}> 
        <Text>Loading</Text>
      </View>
    )
  }
};

const styles = StyleSheet.create({

});
