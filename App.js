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

import { checkToken, setAccessToken, getAccessToken, setApiInformation,
         getApiInformation, setPushToken, getPushToken, setPassword, getUsernameAndPassword } from './Api';


import Login from './Login';
import SignUp from './SignUp';
import Profile from './Profile';
import TabNavigation from './TabNavigation';
import OrderShow from './OrderShow';
import Loading from './Loading';

const Nav = StackNavigator({
  Loading: {
    screen: Loading,
    navigationOptions: {
      headerLeft: null,
      headerTitle: null,
    }
  },
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
      headerTitle: "Libera",
      headerLeft: null,
    }
  },
  OrderShow: {
    screen: OrderShow,
    navigationOptions: {
    }
  },
});

const loginUrl = "https://green-delivery.herokuapp.com/auth/sign_in"

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {}
    this.setState = this.setState.bind(this);

  }

  componentWillMount() {

    var orderID = null

    PushNotificationIOS.getInitialNotification().then(notification => {
      if (notification != null) {
        this.setState({orderID: notification._data.order_id})
      }
    });

    getUsernameAndPassword(this._login, this._navigateToLogin)
    // AppState.addEventListener('change', this._handleAppStateChange);
    PushNotificationIOS.addEventListener('notification', this._onNotification);


  };

  _login = (hash) => {
    fetch(loginUrl,{
      method: "POST",
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ email : hash.uid, password: hash.password }),
    })
      .then(response => this._handleLoginResponse(response))
      .catch(error => console.log
    )
  };

  _handleLoginResponse = (response) => {

    var bodyText = JSON.parse(response._bodyText)
    if(bodyText.errors){
      var errors = bodyText.errors
      console.log(errors)
      this._navigateToLogin()
    }
    else{

      var userInfo = (bodyText.data)
      var accessToken = response.headers.map['access-token'][0]
      var client = response.headers.map.client[0]
      var expiry = response.headers.map.expiry[0]
      var uid = response.headers.map.uid[0]

      api_hash = {}
      api_hash["client"] = client
      api_hash["expiry"] = expiry
      api_hash["accessToken"] = accessToken
      api_hash["uid"] = uid

      setApiInformation(api_hash, this._navigateToHome, this._handleError)
    }
  };

  _handleError = (error) => {
    console.log(error)
  };

  _navigateToHome = () => {
    if(this.state.orderID != null){
      var navigateAction = NavigationActions.reset({
        index: 1,
        key: this.navigator.key,
        actions: [
          NavigationActions.navigate({ routeName: "TabBar"}),
          NavigationActions.navigate({ routeName: "OrderShow", params: { id: this.state.orderID } }),
        ]
      });
    }
    else{
      var navigateAction = NavigationActions.reset({
        index: 0,
        key: this.navigator.key,
        actions: [
          NavigationActions.navigate({ routeName: "TabBar" }),
        ]
      });
    }

    this.navigator.dispatch(navigateAction)
  };

  _navigateToLogin = () => {
    const navigateAction = NavigationActions.reset({
      index: 0,
      key: this.navigator.key,
      actions: [
        NavigationActions.navigate({ routeName: "Login" }),
      ]
    });

    this.navigator.dispatch(navigateAction)
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

  _onNotificationClose = (data) => {
    if(data.action=="tap"){
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
    }
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
