import React, { Component } from 'react'

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Button,
  AsyncStorage,
  FlatList,
  TouchableHighlight,
  ScrollView,
} from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import IconTextListing from './IconTextListing';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

import { checkToken, setAccessToken, getAccessToken, setApiInformation, getApiInformation } from './Api';

export default class OrderIndex extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    getApiInformation(this._getOrder, this._handlerError)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({driverLatitude: position.coords.latitude})
        this.setState({driverLongitude: position.coords.longitude})
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  _handlerError = (error) => {
    console.log(error)
  };

  _getOrder = (apiInfo) => {
    fetch("https://green-delivery.herokuapp.com/api/orders/" + this.props.navigation.state.params.id, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'access-token': apiInfo["accessToken"],
        'token-type': 'Bearer',
        'client': apiInfo["client"],
        'uid': apiInfo["uid"],
        'expiry': apiInfo["expiry"]
      },
    })
      .then(response => this._setOrder(response))
      .catch(error => console.log(error))
  };

  _updateOrder = (apiInfo, status) => {
    fetch("https://green-delivery.herokuapp.com/api/orders/" + this.props.navigation.state.params.id, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'access-token': apiInfo["accessToken"],
        'token-type': 'Bearer',
        'client': apiInfo["client"],
        'uid': apiInfo["uid"],
        'expiry': apiInfo["expiry"]
      },
      body: JSON.stringify({ status: status }),
    })
      .then(response => this._afterUpdateOrder(status))
      .catch(error => console.log(error))
  };

  _onClickUpdateOrderButton = (status) => {
    getApiInformation(this._updateOrder, this._handlerError, status)
  };

  _afterUpdateOrder = (status) => {
    getApiInformation(this._getOrder, this._handlerError)
  };

  _setOrder = (response) => {
    checkToken(response)
    var order = JSON.parse(response._bodyInit)
    this.setState({order: order})
  };

  _renderUpdateOrderButton = (status) => {
    var title = ""
    var buttonStatus = ""
    if(status == "in_driver_queue"){
      buttons = [{ title: "Start Order", buttonStatus: "delivery_in_progress" }]
    }
    else if(status == "delivery_in_progress"){
      buttons = [{ title: "Finish Order", buttonStatus: "delivered" },
                 { title: "Cancel Order", buttonStatus: "cancelled" }]
    }
    else{
      buttons = null
    }

    viewButtons = buttons ? buttons.map((button, i) => {
      // style = ( i==buttons.length ) ? styles.topBorder : null
      return(
        <View key={i} style={styles.topBorder}>
          <Button
            onPress={ () => this._onClickUpdateOrderButton(button.buttonStatus) }
            title={button.title}
            color="#841584"
          />
        </View>
      )
    }) : null

    return(viewButtons)
  }

  render() {
    var id = this.state.order ?  this.state.order.id : null
    var patient_name = this.state.order ? this.state.order.patient : null
    var price = this.state.order ? this.state.order.price : null
    var address = this.state.order ? this.state.order.address : null
    var items = (this.state.order && this.state.order.items) ? this.state.order.items.map((item, i) => {
      return(
        <View key={i}>
          <IconTextListing 
            text={item.quantity + " " + item.name} 
            rightText={item.price} />
        </View>
      )
    }) : null
    var updateOrderButton = (this.state.order) ? this._renderUpdateOrderButton(this.state.order.status) : null
    var maps = this.state.order && this.state.order.latitude ?
      <MapView style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          followsUserLocation={true}
          region={{
            latitude: this.state.driverLatitude,
            longitude: this.state.driverLongitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: parseFloat(this.state.order.latitude),
              longitude: parseFloat(this.state.order.longitude)
            }}
            title={"My Location"}
          />
        </MapView> : null
    return (
      <ScrollView style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.title}> {"Order #" + id} </Text>
        </View>
        <Text style={styles.sectionTitle}> INFO </Text>
        <View style={styles.infoView}>
          <IconTextListing type="feather" name="user" size={20} height={20} width={20} color='#383838' text={patient_name} />
          <IconTextListing type="MaterialIcons" name="attach-money" size={20} height={20} width={20} color='#383838' text={price} />
        </View>
        <Text style={styles.sectionTitle}> ITEMS </Text>
        <View style={styles.infoView}>
          {items}
        </View>
        <Text style={styles.sectionTitle}> MAPS </Text>
        <View style={styles.mapView}>
          {maps}
          <IconTextListing text={address} />
        </View>
        <Text style={styles.sectionTitle}> ACTIONS </Text>
        <View style={styles.infoView}>
          {updateOrderButton}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mapView: {
    flex: 1,
    backgroundColor: 'white',
    height: 300,
    borderBottomColor: '#bbb',
    borderTopColor: '#bbb',
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  titleView: {
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    backgroundColor: 'white',
  },
  sectionTitle: {
    color: '#383838',
    paddingTop: 10,
  },
  title: {
    fontSize: 25,
    backgroundColor: 'white',
    paddingTop: 5,
    paddingBottom: 5,
  },
  icon: {
  },
  infoView: {
    backgroundColor: 'white',
    borderBottomColor: '#bbb',
    borderTopColor: '#bbb',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingTop: 5,
  },
  topBorder: {
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
  },
  map: {
    flex: 1,
    // position: 'absolute',
    // top: Dimensions.get('window').height * 0.4,
    // bottom: Dimensions.get('window').width * 0.8,
    // left: 0,
    // right: 0,
  },
});
