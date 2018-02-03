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

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const logoutUrl = "http://192.168.0.17:3000/auth/sign_out"

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
      <Text style={styles.title}>
          {"Profile"}
        </Text>
          <View style={styles.row1}>
              <Button
                onPress={this._onLogoutPressed}
                color='#427cee'
                title='Logout'
                containerViewStyle={{width: '80%', marginLeft: 25}}
              />
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    flex: 1,
    paddingTop: 10,
    paddingBottom: 100,
  },

  title: {
    paddingTop: 10,
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    marginLeft: 12,
    marginBottom: 10
  },

  row1: {
    backgroundColor: '#ffffff',
    borderTopWidth: .3,
    borderBottomWidth: .3,
    borderColor: '#A9A9A9',
  }

});
