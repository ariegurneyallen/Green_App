// mobile api.js

import {
  AsyncStorage,
} from 'react-native';

// Checks if there is a new access token and puts it into async storage
function checkToken(response) {
  console.log("checkToken")

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

async function setApiInformation(api_hash, successFunction, errorFunction) {
  return await AsyncStorage.multiSet([
    ['accessToken', api_hash['accessToken']], 
    ['uid', api_hash['uid']], 
    ['expiry', api_hash['expiry']], 
    ['client', api_hash['client']]
  ]).then((token) => {
    successFunction(api_hash, token)
  }, (error) => {
    console.log("set")
    console.log(error)
  });
};

async function getApiInformation(successFunction, errorFunction) {
  return await AsyncStorage.multiGet(['accessToken', 'uid', 'expiry', 'client']).then((token) => {
    hash = token.reduce(function(p, c) {
         p[c[0]] = c[1];
         return p;
    }, {});
    successFunction(hash)
  }, (error) => {
    errorFunction(error)
  });
};


export { checkToken, setAccessToken, getAccessToken, getApiInformation, setApiInformation };