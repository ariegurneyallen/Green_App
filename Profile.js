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
      <View style={styles.container}>
        <Button
          onPress={this._onLogoutPressed}
          color='#427cee'
          title='Logout'
          marginBottom= '50px'
          backgroundColor= '#427cee'
          containerViewStyle={{width: '80%', marginLeft: 25}}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    paddingTop: 550,
    paddingBottom: 100,
  }
});
