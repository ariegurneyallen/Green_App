/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  PushNotificationIOS,
  AppState,
} from 'react-native';

import { StackNavigator, NavigationActions } from 'react-navigation';

import DropdownAlert from 'react-native-dropdownalert';


import Login from './Login';
import SignUp from './SignUp';
import Profile from './Profile';
import TabNavigation from './TabNavigation';
import OrderShow from './OrderShow';

const Nav = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      headerTitle: "Sign Up",
    }
  },
  TabBar: {
    screen: TabNavigation,
    navigationOptions: {
      headerTitle: "Orders",
      headerLeft: null,
    }
  },
  OrderShow: {
    screen: OrderShow,
    navigationOptions: {
    }
  },
});

export default class App extends Component {

  componentWillMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    PushNotificationIOS.addEventListener('notification', this._onNotification);

    PushNotificationIOS.addEventListener('localNotification', function(token){
      console.log('local notification: ', token)
    });

  };
  // Routes to page if push notification is clicked
  _onNotification = (notification) => {
    if (AppState.currentState=='background'){
      this.navigator.dispatch(
        NavigationActions.reset({
          index: 1,
          key: this.navigator.key,
          actions: [
            NavigationActions.navigate({ routeName: "TabBar"}),
            NavigationActions.navigate({ routeName: "OrderShow", params: { id: notification._data.order_id } }),
          ]
        })
      );
    }
    else if (AppState.currentState=='active'){
      this.dropdown.alertWithType('info', 'New Order', "Order # From...", notification._data.order_id);
    }
  };

  _handleAppStateChange = (state) => {
    // console.log(state)
    // PushNotificationIOS.addEventListener('notification', this._onLocalNotification);
  };

  _onNotificationClose = (data) => {
    this.navigator.dispatch(
      NavigationActions.reset({
        index: 1,
        key: this.navigator.key,
        actions: [
          NavigationActions.navigate({ routeName: "TabBar"}),
          NavigationActions.navigate({ routeName: "OrderShow", params: { id: data.data } }),
        ]
      })
    );
  };

  render() {
    return (
      <View style={styles.container} >
        <Nav initialRouteName="Login" ref={nav => { this.navigator = nav; }} />
        <DropdownAlert ref={ref => this.dropdown = ref} onClose={data => this._onNotificationClose(data)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
