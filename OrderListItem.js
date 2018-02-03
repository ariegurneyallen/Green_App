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
            <View style={styles.firstRow}>
              <View style={{flex: 4}}>
                <KeyValueText label={'Patient'} content={order.patient} />
              </View>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={styles.arrowText}>
                  <FontAwesome>{Icons.arrowRight}</FontAwesome>
                </Text>
              </View>
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

  arrowText:{
    fontSize: 25,
    color: 'white',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },

  container: {
    flex: 1,
    backgroundColor: '#251351',
    overflow: 'visible',
    padding: 7,
    borderRadius: 10,
  },

  firstRow: {
    flexDirection: 'row',
    display: 'flex',
  },

  seperator: {
    height: 10
  },

  text: {
    fontSize: 15,
    color: '#ffffff',
  },

  center: {
    alignItems: 'flex-end'
  }

});
