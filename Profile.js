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

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const logoutUrl = "http://localhost:3000/auth/sign_out"

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accessToken: "",
      email: "",
      password: ""
    };
  };

  componentWillMount() {
    this.getAccessToken()
  };

  _onLogoutPressed = () => {
    fetch(logoutUrl,{
      method: "DELETE",
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid: this.props.screenProps.email, client : this.props.screenProps.client, 'access-token': this.props.screenProps.accessToken }),
    })
      .then(this.logout())
      .catch(error => console.log("Error: Logout => " + error))
  };

  async logout() {
    await AsyncStorage.clear().then(() => {
      this.props.screenProps.navigation.navigate('Login')
    }, (error) => {
      console.log(error)
    });
  };

  async getAccessToken() {

    await AsyncStorage.getItem('accessToken').then((token) => {
      this.setState({accessToken: token})
    }, (error) => {
      console.log(error)
    });
  };

  render() {
    return (
      <View>
        <Button
          onPress={this._onLogoutPressed}
          color='black'
          title='Logout'
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({

});