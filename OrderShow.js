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

import { checkToken, setAccessToken, getAccessToken, setApiInformation, getApiInformation } from './Api';

export default class OrderIndex extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    getApiInformation(this._getOrder, this._handlerError)
  }

  _handlerError = (error) => {
    console.log(error)
  };

  _getOrder = (apiInfo) => {
    fetch("http://192.168.1.18:3000/api/orders/" + this.props.navigation.state.params.id, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'access-token': apiInfo["accessToken"],
        'token-type': 'Bearer',
        'client': apiInfo["client"],
        'uid': apiInfo["uid"],
        'expiry': apiInfo["expiry"]
      },
    })
      .then(response => this._setOrder(response))
      .catch(error => console.log(error))
  };


  _setOrder = (response) => {
    var order = JSON.parse(response._bodyInit)
    this.setState({order: order})
  }


  render() {
    var order = this.state.order ?
      <Text style={styles.title}>{this.state.order.id}</Text> 
      : <Text style={styles.title}>{"Loading"}</Text>
      
    return (
      <View style={styles.container}>
        {order}
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
