import React, { Component } from 'react'

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Button,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const signUpUrl = "http://localhost:3000/auth"

export default class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  componentWillMount() {
  };

  _onTextChange = (event, key) => {
    var newState = {}
    newState[key] = event.nativeEvent.text
    this.setState(newState)
  };

  _onSignUpPressed = () => {
    fetch(signUpUrl,{
      method: "POST",
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email : this.state.email, 
        password: this.state.password ,
        password_confirmation: this.state.confirmPassword,
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        confirm_success_url: "http://localhost:3000/users/sign_in"
      }),
    })
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }


  render() {
    return (
      <View style={styles.container} >
        <TextInput 
          placeholder={"First Name"} 
          value={this.state.firstName}
          autoCorrect={false}
          onChange={ (event) => this._onTextChange(event, 'firstName')}
          style={styles.textInputFields} 
        />
        <TextInput 
          placeholder={"Last Name"} 
          value={this.state.lastName}
          autoCorrect={false}
          onChange={ (event) => this._onTextChange(event, 'lastName')}
          style={styles.textInputFields} 
        />
        <TextInput 
          placeholder={"Email"} 
          value={this.state.email}
          autoCorrect={false}
          autoCapitalize={"none"}
          onChange={ (event) => this._onTextChange(event, 'email')}
          style={styles.textInputFields} 
        />
        <TextInput 
          placeholder={"Password"} 
          value={this.state.password}
          autoCorrect={false}
          autoCapitalize={"none"}
          onChange={ (event) => this._onTextChange(event, 'password')}
          style={styles.textInputFields} 
        />
        <TextInput 
          placeholder={"Confirm Password"} 
          value={this.state.confirmPassword}
          autoCorrect={false}
          autoCapitalize={"none"}
          onChange={ (event) => this._onTextChange(event, 'confirmPassword')}
          style={styles.textInputFields} 
        />
        <Button
          onPress={this._onSignUpPressed}
          color='black'
          title='Sign Up'
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: screenHeight * 0.025,
    alignItems: 'center',
  },
  textInputFields: {
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