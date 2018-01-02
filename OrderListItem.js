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
          <Text>
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
    // flex: 1,
    borderWidth: 2,
    backgroundColor: 'white',
    overflow: 'visible',
    padding: 5
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  seperator: {
    height: 10
  }
});
