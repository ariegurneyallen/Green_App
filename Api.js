// modile api.js

import {
  AsyncStorage,
} from 'react-native';

// Checks if there is a new access token and puts it into async storage
function checkToken(response) {

  accessToken = response.headers.map['access-token']

  if(accessToken){
    setAccessToken(accessToken[0])
  }
}

async function setAccessToken(accessToken) {
  try {
    await AsyncStorage.setItem('accessToken', accessToken)
                      // .then(this._navigateToHome(accessToken, client, expiry))
  } catch (error) {
    console.log(error)
  }
};

async function getAccessToken(successFunction, errorFunction) {
  return await AsyncStorage.getItem('accessToken').then((token) => {
    successFunction(token)
  }, (error) => {
    console.log(error)
  });
};



export { checkToken, setAccessToken, getAccessToken };