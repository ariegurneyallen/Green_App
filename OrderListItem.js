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

import FontAwesome, { Icons } from 'react-native-fontawesome';

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
              <Text style={{margin: 10, fontSize: 25, textAlign: 'left', color: 'white'}}>
                  <FontAwesome>{Icons.arrowRight}</FontAwesome>
              </Text>
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
    backgroundColor: '#251351',
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
    lineHeight: 20
  },

  center: {
    alignItems: 'flex-end'
  }

});
