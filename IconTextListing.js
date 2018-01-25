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

import { Icon } from 'react-native-elements';


export default class IconTextListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {

    var icon = this.props.name ? 
      <Icon name={this.props.name} type={this.props.type} size={this.props.size} color={this.props.color} height={this.props.height} width={this.props.width} />
      : null


    return (
      <View style={styles.information}> 
        {icon}
        <View style={styles.informationTextView}>
          <View tyle={styles.textLeftView}>
            <Text style={styles.informationText}> 
              {this.props.text} 
            </Text>
          </View>
          <View style={styles.textRightView}>
            <Text style={styles.textRight}> 
              {this.props.rightText} 
            </Text>
          </View>
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({

  information: {
    padding: 3,
    flexDirection: 'row',
    display: 'flex',
  },
  informationText: {
    fontSize: 17,
    paddingLeft: 6,
  },
  textRight: {
    fontSize: 17,
    alignSelf: 'flex-end',
  },
  textRightView: {
    flex: 1
  },
  textLeftView: {
    flex: 1
  },
  informationTextView: {
    flex: 1,
    flexDirection: 'row'
  },
});
