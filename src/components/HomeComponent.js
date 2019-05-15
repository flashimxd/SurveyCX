import React, { Component } from 'react';
import { View } from 'react-native';
import FaceBox from './FaceboxComponent';
import Camera from './CameraComponent';

class HomeComponent extends Component {
  static navigationOptions = {
    title: 'Home',
    header: null,
  };
  navigateToHistory() {
    const { navigation } = this.props;
    navigation.navigate('History');
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Camera />
        <FaceBox />
      </View>
    );
  }
}

export default HomeComponent;
