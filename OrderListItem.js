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

import KeyValueText from './KeyValueText'


export default class OrderListItem extends Component {

  constructor(props) {
    super(props);
  }

  _onPress = () => {

  }

  render() {
    const order = this.props.order;

    var items = order.items.map((item) => {
      return <Text>{item.detail}, {item.quantity}</Text>
    });

    return (
      <View>
      <TouchableHighlight
        onPress={this._onPress}
      >
        <View style={styles.container}>
          <KeyValueText label={"mykey"} content={"myvalue"} />
          <Text style={styles.text}>
            Status: {order.status}
            {"\n"}
            Patient: {order.patient}
            {"\n"}
            Address: {order.address}
            {"\n"}
            Items: {items}
          </Text>
        </View>
      </TouchableHighlight>
      <View style={styles.seperator}></View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#95BCF2',
    overflow: 'visible',
    padding: 7,
    borderRadius: 10,
  },

  seperator: {
    height: 10
  },

  text: {
    fontSize: 15,
    color: '#ffffff',
    lineHeight: 25
  }

});
