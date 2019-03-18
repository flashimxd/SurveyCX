import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import FaceBox from './FaceboxComponent';

class HomeComponent extends Component {
  static navigationOptions = {
    title: 'Home',
  };
  navigateToHistory() {
    const { navigation } = this.props;
    navigation.navigate('History');
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <FaceBox />
      </View>
    );
  }
}

export default HomeComponent;
