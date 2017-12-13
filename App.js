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
} from 'react-native';

import {
  StackNavigator
} from 'react-navigation';

import Login from './Login';
import SignUp from './SignUp';
import Profile from './Profile';
import TabNavigation from './TabNavigation';

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
      headerTitle: "SignUp",
    }
  },
  TabBar: { 
    screen: TabNavigation,
    navigationOptions: {
      headerTitle: "Green",
      headerLeft: null,
    }
  },
});

// export default class App extends Component<{}> {

//   render() {
//     return (
//       <View style={styles.container}>
//         <Login/>
//       </View>
//     );
//   }
// }

export default Nav;

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
