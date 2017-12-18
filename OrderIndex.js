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

import { checkToken, setAccessToken, getAccessToken } from './Api';
import OrderListItem from './OrderListItem'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class OrderIndex extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentWillMount() {
    getAccessToken(this._getOrders, "Set Error Case")
  }

  _getOrders = (accessToken) => {
    fetch("http://localhost:3000/api/driver_orders",{
      method: "POST",
      headers: { 
        Accept: 'application/json', 
        'Content-Type': 'application/json', 
        'access-token': accessToken ? accessToken : this.props.accessToken,
        'token-type': 'Bearer',
        'client': this.props.client,
        'uid': this.props.email,
        'expiry': this.props.expiry
      },
    })
      .then(response => this._setOrders(response))
      .catch(error => console.log(error))
  };

  _setOrders = (response) => {
    checkToken(response)
    var orders = JSON.parse(response._bodyText)
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
        <Text style={styles.title}>Orders</Text>
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
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
});