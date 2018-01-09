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

import { checkToken, setAccessToken, getAccessToken, setApiInformation, getApiInformation } from './Api';
import OrderListItem from './OrderListItem'
import OrderShow from './OrderShow'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class OrderIndex extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };

  }

  componentWillMount() {
    getApiInformation(this._getOrders, console.log("Set Error Case"))
  }

  _getOrders = (apiInfo) => {
    console.log("Get Orders")
    console.log("--------------------")
    console.log(apiInfo)
    console.log(apiInfo['accessToken'])
    fetch("http://192.168.1.18:3000/api/orders",{
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'access-token': apiInfo['accessToken'],
        'token-type': 'Bearer',
        'client': apiInfo['client'],
        'uid': apiInfo['uid'],
        'expiry': apiInfo['expiry']
      },
    })
      .then(response => this._setOrders(response))
      .catch(error => this._handleError(error))
  };

  _handleError = (error) => {
    console.log("Order Index Get Orders Error");
    console.log(error);
  };


  _setOrders = (response) => {
    console.log("set order")
    console.log(response)
    checkToken(response)
    var orders = JSON.parse(response._bodyText)
    console.log("setting orders")
    this.setState({orders: orders})

  };

  _onButtonPress = () => {
    console.log(this.state.orders)
  };

  _keyExtractor = (order, index) => index;

  _renderItem = (order) => {
    return(
      <OrderListItem
        order={order.item}
        navigation={this.props.navigation}
      />
    );
  };

  render() {
    var orders = this.state.orders ?
      <FlatList
        data={this.state.orders}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      /> : <Text>{"Loading"}</Text>
    return (
      <View style={styles.container}>
        <Text style={styles.title}></Text>
        {orders}
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
