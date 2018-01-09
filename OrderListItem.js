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

const screenWidth = Dimensions.get('window').width;


export default class OrderListItem extends Component {

  constructor(props) {
    super(props);
  }

  _onPress = () => {
    this.props.navigation.navigate('OrderShow', { id: this.props.order.id });
  }

  render() {
    const order = this.props.order;

    return (
      <View>
      <TouchableHighlight style={styles.corner}
        onPress={this._onPress}
      >
        <View style={styles.container}>
          <Text style={styles.text}>
            <KeyValueText label={'Status'} content={order.status} />

            <KeyValueText label={'Patient'} content={order.patient} />

            <KeyValueText label={'Address'} content={order.address} />

          </Text>

          <View style={styles.center}>
            <TouchableHighlight style={styles.button}>
                <Text style={styles.start} onPress={this._onSignUpPressed}> Start Delivery </Text>
            </TouchableHighlight>
          </View>

        </View>
      </TouchableHighlight>
      <View style={styles.seperator}></View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  corner: {
    borderRadius: 10,
  },

  container: {
    backgroundColor: '#95BCF2',
    overflow: 'visible',
    padding: 7,
    borderRadius: 10,
  },

  seperator: {
    height: 12
  },

  text: {
    fontSize: 15,
    color: '#ffffff',
    lineHeight: 25
  },

  button: {
    backgroundColor: '#ffffff',
    padding: 7,
    borderRadius: 20,
    width: screenWidth * 0.5,
    margin: 'auto'
  },

  start: {
    color: '#2C3951',
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    textAlign: 'center'
  },

  center: {
    alignItems: 'center'
  }

});
