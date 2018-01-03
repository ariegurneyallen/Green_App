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
          <Text style={styles.text}>
            <KeyValueText label={'Status'} content={order.status} />
            {"\n"}
            <KeyValueText label={'Patient'} content={order.patient} />
            {"\n"}
            <KeyValueText label={'Address'} content={order.address} />
            {/*
              Items: {items}
            */}
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
