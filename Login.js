import React, { Component } from 'react'

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  AsyncStorage,
  Button,
  TouchableHighlight,
  PushNotificationIOS,
  Geolocation,
} from 'react-native';

import {
  // FormLabel,
  // FormInput,
  // Button,
} from 'react-native-elements';

import { checkToken, setAccessToken, getAccessToken, setApiInformation, getApiInformation, setPushToken, getPushToken, setPassword } from './Api';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const loginUrl = "https://green-delivery.herokuapp.com/auth/sign_in"
const forgotPasswordUrl = "https://green-delivery.herokuapp.com/auth/password"
const forgotPasswordRedirectUrl = "https://green-delivery.herokuapp.com/users/sign_in"
const pushNotificationUrl = "https://green-delivery.herokuapp.com/api/add_token"

// const loginUrl = "http://192.168.0.2:3000/auth/sign_in"
// const forgotPasswordUrl = "http://192.168.0.2:3000/auth/password"
// const forgotPasswordRedirectUrl = "http://192.168.0.2:3000/users/sign_in"
// const pushNotificationUrl = "http://192.168.0.2:3000/api/add_token"


// function loginQuery(email, password) {
//   return loginUrl + "email=" + email + "&password=" + password;
// }

export default class MyNavigation extends Component {

  constructor(props) {
    super(props);

    var navProps = this.props.navigation.state.params

    this.state = {
      email: navProps ? navProps.email : "driver1@email.com",
      password: navProps ? navProps.password : "password",
      loginButton: true,
      loginError: navProps ? navProps.messages : ""
    };
  }

  componentWillMount() {
    PushNotificationIOS.requestPermissions();
    PushNotificationIOS.addEventListener('register', function(token){
      setPushToken(token)
    });
    PushNotificationIOS.addEventListener('registrationError', function(token){
     console.log('registrationError: ',token)
    });
  };

  _navigateToHome = (apiInfo) => {
    getPushToken(apiInfo, this._sendPushToken)
    this.props.navigation.navigate('TabBar',
      { email: apiInfo['uid'], accessToken: apiInfo['accessToken'], client: apiInfo['client'], expiry: apiInfo['expiry'] }
    )
  };

  _sendPushToken = (apiInfo, pushToken) => {
    fetch(pushNotificationUrl,{
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'access-token': apiInfo['accessToken'],
        'token-type': 'Bearer',
        'client': apiInfo['client'],
        'uid': apiInfo['uid'],
        'expiry': apiInfo['expiry']
      },
      body: JSON.stringify({ mobile_access_token: pushToken }),
    }).then(response => checkToken(response))
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
      .catch(error => this._handleLoginError(error)
    )
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
      var expiry = response.headers.map.expiry[0]
      api_hash = {}
      api_hash["client"] = client
      api_hash["expiry"] = expiry
      api_hash["accessToken"] = accessToken
      api_hash["uid"] = this.state.email

      setPassword(this.state.password)
      setApiInformation(api_hash, this._navigateToHome, this._handleLoginError)

    }
  };

  _handleLoginError = (error) => {
    // Handle errors appropriately
    console.log(error)
  };

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.title}>
          {"Libera"}
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
          style={styles.FormInput}
        />

        <TextInput
          placeholder={"Password"}
          value={this.state.password}
          autoCorrect={false}
          autoCapitalize={"none"}
          onChange={this._onPasswordTextChanged}
          style={styles.FormInput}
        />

        <Button
          onPress={this._onLoginPressed}
          color='#427cee'
          title='Login'
          marginBottom= '50px'
          backgroundColor= '#427cee'
          containerViewStyle={{width: '80%', marginLeft: 25}}
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
    flex: 2,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },

  title: {
    paddingTop: 100,
    paddingBottom: 120,
    fontSize: 40,
    color: '#2C3951',
    fontFamily: 'OpenSans-SemiBold',
  },

  message: {
    height: screenHeight * 0.1,
    fontFamily: 'OpenSans-Light',
    width: screenWidth * 0.85,
  },

  FormInput: {
    backgroundColor: '#f7f7f7',
    height: screenHeight * 0.075,
    width: screenWidth * 0.85,
    marginBottom: 10,
    padding: 10,
    marginRight: 5,
    fontSize: 14,
    // borderWidth: 1,
    // borderColor: 'black',
    borderRadius: 10,
    fontFamily: 'OpenSans-Light',
  }


});
