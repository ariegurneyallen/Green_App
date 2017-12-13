import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';

import Profile from './Profile';
import Home from './Home'

const BottomNav = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: "Home",
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: "User",
    },
  },
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});

export default class TabNavigation extends Component {

  constructor(props) {
    super(props);
  }

  render(){

    var screenProps = this.props.navigation.state.params

    return(
      <BottomNav screenProps={{navigation: this.props.navigation, email: screenProps.email, accessToken: screenProps.accessToken, client: screenProps.client }}/>
    )
  }
}