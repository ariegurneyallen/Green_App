import React, { Component } from 'react'

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Button,
  AsyncStorage,
  FlatList,
  TouchableHighlight,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

import { checkToken, setAccessToken, getAccessToken } from './Api';

export default class OrderIndex extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    getAccessToken("Success Function", "Error Function")
  }

  // _getOrder = (accessToken) => {
  //   fetch("http://192.168.1.18:3000/api/driver_orders",{
  //     method: "POST",
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       'access-token': accessToken ? accessToken : this.props.accessToken,
  //       'token-type': 'Bearer',
  //       'client': this.props.client,
  //       'uid': this.props.email,
  //       'expiry': this.props.expiry
  //     },
  //   })
  //     .then(response => this._setOrders(response))
  //     .catch(error => console.log(error))
  // };


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Legolas</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
  },

  container: {
    flex: 1,
  },
});
