import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Profile from './Profile';
import Home from './Home'

import { AppState, PushNotificationIOS } from 'react-native';

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

  componentWillMount() {
  };

  _navigateToOrder = (event) => {
    console.log("navigateToOrder")
    this.props.navigation.navigate('OrderShow', { id: this.props.order.id });
  };

  _handleAppStateChange = (state) => {
    console.log(state)
  };

  render(){

    var screenProps = this.props.navigation.state.params

    return(
      <BottomNav screenProps={{navigation: this.props.navigation }}/>
    )
  }
}
