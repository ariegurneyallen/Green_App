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

const loginUrl = "http://localhost:3000/auth/sign_in"
const forgotPasswordUrl = "http://localhost:3000/auth/password"
const forgotPasswordRedirectUrl = "http://localhost:3000/users/sign_in"

// function loginQuery(email, password) {
//   return loginUrl + "email=" + email + "&password=" + password;
// }

export default class MyNavigation extends Component {

  constructor(props) {
    super(props);

    var navProps = this.props.navigation.state.params

    this.state = {
      email: navProps ? navProps.email : "",
      password: navProps ? navProps.password : "",
      loginButton: true,
      loginError: navProps ? navProps.messages : ""
    };
  }

  async setAccessToken(accessToken, client) {
    try {
      await AsyncStorage.setItem('accessToken', accessToken)
                        .then(this._navigateToHome(accessToken, client))
    } catch (error) {
      console.log("Error: Could not set access token")
    }
  };

  _navigateToHome = (accessToken, client) => {
    this.props.navigation.navigate('TabBar', { email: this.state.email, accessToken: accessToken, client: client })
  };

  // Make Below 2 into one function
  _onEmailTextChanged = (event) => {
    this.setState({ email: event.nativeEvent.text });
  };

  _onPasswordTextChanged = (event) => {
    this.setState({ password: event.nativeEvent.text });
  };

  _onSignUpPressed = () => {
    this.props.navigation.navigate('SignUp')
  };

  _onForgotPasswordPressed = () => {
    if(this.state.email == ""){
      this.setState({loginError: "Must enter an email."})
      return
    }

    fetch(forgotPasswordUrl,{
      method: "POST",
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: this.state.email, redirect_url: forgotPasswordRedirectUrl }),
    })
      .then(response => this._handleForgotPasswordResponse(response))
      .catch(error => console.log(error))
  };

  _handleForgotPasswordResponse = (response) => {
    var bodyText = JSON.parse(response._bodyText)
    if(bodyText.errors){
      this.setState({loginError: bodyText.errors})
    }
    else{
      this.setState({loginError: bodyText.message})
    }
  }; 

  _onLoginPressed = () => {

    if(this.state.email == ""){
      this.setState({loginError: "Must enter an email."})
      return
    }
    if(this.state.password == ""){
      this.setState({loginError: "Must enter a password."})
      return
    }
    if(this.state.loginButton == false){
      return
    };
    this.setState({ loginButton: false });

    fetch(loginUrl,{
      method: "POST",
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ email : this.state.email, password: this.state.password }),
    })
      .then(response => this._handleLoginResponse(response))
      .catch(error => this._handleLoginError(error))
  };

  _handleLoginResponse = (response) => {
    var bodyText = JSON.parse(response._bodyText)
    if(bodyText.errors){
      var errors = bodyText.errors
      this.setState({ email: "" })
      this.setState({ password: "" })
      this.setState({ loginError: errors })
      this.setState({ loginButton: true })
    }
    else{
      var userInfo = (bodyText.data)
      var accessToken = response.headers.map['access-token'][0]
      var client = response.headers.map.client[0]
      this.setAccessToken(accessToken, client)
      
    }
  };

  _handleLoginError = (error) => {
    console.log(error)
  };

  render() {
    // const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>

        <Text style={styles.title}>
          {"Green"}
        </Text>

        <Text style={styles.message}>
          {this.state.loginError}
        </Text>

        <TextInput 
          placeholder={"Email"} 
          value={this.state.email}
          autoCorrect={false}
          autoCapitalize={"none"}
          onChange={this._onEmailTextChanged}
          style={styles.loginFields} 
        />

        <TextInput 
          placeholder={"Password"} 
          value={this.state.password}
          autoCorrect={false}
          autoCapitalize={"none"}
          onChange={this._onPasswordTextChanged}
          style={styles.loginFields}
        />

        <Button
          onPress={this._onLoginPressed}
          color='black'
          title='Login'
        />
        <Button
          onPress={this._onSignUpPressed}
          color='black'
          title='Sign Up'
        />
        <Button
          onPress={this._onForgotPasswordPressed}
          color='black'
          title='Forgot Password'
        />


      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#81ee7d',
  },

  title: {
    paddingTop: 100,
    paddingBottom: 100,
    fontSize: 40,
    fontWeight: 'bold',
  },

  message: {
    height: screenHeight * 0.05,
  },

  loginFields: {
    backgroundColor: 'white',
    height: screenHeight * 0.075,
    width: screenWidth * 0.85,
    marginBottom: 10,
    padding: 10,
    marginRight: 5,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
  }

});