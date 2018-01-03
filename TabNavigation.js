import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Profile from './Profile';
import Home from './Home'

const BottomNav = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: "Orders",
      tabBarIcon: ({ tintColor }) => <Icon name="shopping-basket" size={30} color={tintColor} />
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: "Account",
      tabBarIcon: ({ tintColor }) => <Icon name="perm-identity" size={30} color={tintColor} />
    },
  },
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#95BCF2',
  },
});

export default class TabNavigation extends Component {

  constructor(props) {
    super(props);
  }

  render(){

    var screenProps = this.props.navigation.state.params

    return(
      <BottomNav screenProps={{navigation: this.props.navigation, email: screenProps.email, accessToken: screenProps.accessToken, client: screenProps.client, expiry: screenProps.expiry }}/>
    )
  }
}
