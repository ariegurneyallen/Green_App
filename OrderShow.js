import React, { Component } from 'react'

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  AsyncStorage,
  FlatList,
  TouchableHighlight,
  ScrollView,
  Linking,

} from 'react-native';

import { Button } from 'native-base';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import IconTextListing from './IconTextListing';
import call from 'react-native-phone-call';
import Prompt from 'react-native-prompt';
// import getDirections from 'react-native-google-maps-directions'


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

import { checkToken, setAccessToken, getAccessToken, setApiInformation, getApiInformation } from './Api';

export default class OrderIndex extends Component {

  constructor(props) {
    super(props);
    this.state = { showPrompt: false
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
      body: JSON.stringify(status),
    })
      .then(response => this._afterUpdateOrder(status))
      .catch(error => console.log(error))
  };

  _onClickUpdateOrderButton = (status) => {
    getApiInformation(this._updateOrder, this._handlerError, { status: status })
  };

  _afterUpdateOrder = (status) => {
    getApiInformation(this._getOrder, this._handlerError)
  };

  _setOrder = (response) => {
    console.log(response)
    checkToken(response)
    var order = JSON.parse(response._bodyInit)
    this.setState({order: order})
  };

  _submitComment = (value) => {
    console.log("submit Notes")
    getApiInformation(this._updateOrder, this._handlerError, { comment: value })
    this.setState( {showPrompt: false})
  };

  _callPatient = () => {
    call({ number: this.state.order.phone_number, prompt: false }).catch(console.error)
  };

  _getDirections = () => {

    url = "https://www.google.com/maps/dir/?api=1&destination=" + this.state.order.address
    Linking.openURL(url)

  };

  _renderUpdateOrderButton = (status) => {


    if(status == "delivery_in_progress"){
      return(
        <View>
          <Button block primary style={styles.buttonz} onPress={ () => this._onClickUpdateOrderButton("delivered") } >
            <Text style={{ color: '#ffffff', fontSize: 15}}>{"Finish Order"}</Text>
          </Button>
          <Button block bordered danger style={styles.buttonz} onPress={ () => this._onClickUpdateOrderButton("cancelled") } >
            <Text style={{ color: 'red', fontSize: 15}}>{"Cancel Order"}</Text>
          </Button>
        </View>
      )
    }
    else if(status == "in_driver_queue"){
      return(
        <Button block primary style={styles.buttonz} onPress={ () => this._onClickUpdateOrderButton("delivery_in_progress") } >
          <Text style={{ color: '#ffffff', fontSize: 15}}>{"Start Order"}</Text>
        </Button>
      )
    }
    else if (status == "delivered"){
      return(
        <Text>{"This order has been successfully delivered"}</Text>
      )
    }
    else{
      return
    }

  };

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
    var callButton = (this.state.order && this.state.order.phone_number) ?
      (<Button
        onPress={this._callPatient}
        title='Call patient'
        containerViewStyle={{width: '80%', marginLeft: 25}}
      >
        <Text>Call Patient</Text>
      </Button>
    ) : null
    var comments = (this.state.order && this.state.order.comment) ?
      <Text style={styles.comments}>{this.state.order.comment}</Text> : null
    var commentsText = (this.state.order && this.state.order.comment) ? this.state.order.comment : ""
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
        <View style={styles.buttonz}>
          {updateOrderButton}
        </View>

        <Text style={styles.sectionTitle}> Info </Text>
        <View style={styles.infoView}>
          <IconTextListing type="feather" name="user" size={20} height={20} width={20} color='#989d9d' text={patient_name} />
          <IconTextListing type="MaterialIcons" name="attach-money" size={20} height={20} width={20} color='#989d9d' text={price} />
          {callButton}
        </View>
        <Text style={styles.sectionTitle}> Products </Text>
        <View style={styles.infoView}>
          {items}
        </View>
        <Text style={styles.sectionTitle}> Directions </Text>
        <View style={styles.infoView}>
          <View style={styles.mapView}>
            {maps}
            <IconTextListing text={address} />

            <Button block style={styles.buttonz}
              onPress={this._getDirections}
              title='Get directions'
              containerViewStyle={{width: '80%', marginLeft: 25}}
            >
                <Text>Get Directions</Text>
            </Button>
          </View>
        </View>
        <Text style={styles.sectionTitle}> Comments </Text>
        <View style={styles.infoView}>
          {comments}
          <Button block style={styles.buttonz}
            onPress={ () => this.setState( {showPrompt: true}) }
            containerViewStyle={{width: '80%', marginLeft: 25}}
          >
          <Text>{comments ? "Edit Comment" : "Add Comment"}</Text>
          </Button>
        </View>
        <Prompt
          title="Enter Comment"
          placeholder="Enter Comments Here"
          defaultValue={commentsText}
          visible={ this.state.showPrompt }
          onCancel={ () => this.setState( {showPrompt: false}) }
          onSubmit={ (value) => this._submitComment(value) }
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  mapView: {
    flex: 1,
    backgroundColor: 'white',
    height: 300,
  },
  titleView: {
    borderBottomColor: '#bbb',

  },
  comments: {
    marginBottom: 10,
  },
  sectionTitle: {
    paddingTop: 10,
    fontSize: 15,
    marginLeft: 2,
    marginBottom: 2,
    color: '#000000',
    marginLeft: 6,
    fontWeight: '800'
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    paddingTop: 10,
    paddingBottom: 5,
  },
  infoView: {
    backgroundColor: 'white',
     borderBottomColor: '#bbb',
    // borderTopColor: '#bbb',
     borderBottomWidth: 1,
    // borderTopWidth: 1,
    paddingTop: 3,
    marginHorizontal: 8,
    paddingBottom: '5%'
  },
  topBorder: {
    borderBottomColor: '#bbb',
    // borderBottomWidth: 1,
  },
  map: {
    flex: 1,
    // position: 'absolute',
    // top: Dimensions.get('window').height * 0.4,
    // bottom: Dimensions.get('window').width * 0.8,
    // left: 0,
    // right: 0,
  },
  buttonz: {
    marginHorizontal: 6,
    marginBottom: 5,
  }
});
