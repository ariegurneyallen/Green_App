// mobile api.js

import {
  AsyncStorage,
} from 'react-native';

// Checks if there is a new access token and puts it into async storage
function checkToken(response) {
  // console.log(response)


  accessToken = response.headers.map['access-token']
  expiry = response.headers.map['expiry']
  client = response.headers.map['client']
  uid = response.headers.map['uid']

  if(accessToken){
    setApiInformation({accessToken: accessToken[0], expiry: expiry[0], client: client[0], uid: uid[0]})
  }
}

async function setPushToken(pushToken) {
  try {
    await AsyncStorage.setItem('pushToken', pushToken)
                      // .then(this._navigateToHome(accessToken, client, expiry))
  } catch (error) {
    // console.log("Saving Push Notification Error: " + error)
  }
}

async function getPushToken(apiInfo, successFunction) {
  return await AsyncStorage.getItem('pushToken').then((token) => {
    successFunction(apiInfo, token)
  }, (error) => {
    console.log("Get Push Token Error: " + error)
  });
};

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
    if(successFunction){
      successFunction(api_hash)
    }
  }, (error) => {
    console.log(error)
  });
};

async function getApiInformation(successFunction, errorFunction, params) {
  return await AsyncStorage.multiGet(['accessToken', 'uid', 'expiry', 'client']).then((token) => {
    hash = token.reduce(function(p, c) {
         p[c[0]] = c[1];
         return p;
    }, {});
    if(params){
      successFunction(hash, params)
    }
    else{
      successFunction(hash)
    }
  }, (error) => {
    console.log(error)
  });
};


export { checkToken, setAccessToken, getAccessToken, getApiInformation, setApiInformation, setPushToken, getPushToken };