import React, { Component } from 'react'

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Button,
  AsyncStorage,
} from 'react-native';

import OrderIndex from './OrderIndex';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
  }

  render() {
    return (
      <View style={styles.container}>
        <OrderIndex
          accessToken={this.props.screenProps.accessToken}
          client={this.props.screenProps.client}
          email={this.props.screenProps.email}
          expiry={this.props.expiry}
          navigation={this.props.screenProps.navigation}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
});
