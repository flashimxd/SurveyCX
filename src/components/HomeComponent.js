import React, { Component } from 'react';
import { View } from 'react-native';
import FaceBox from './FaceboxComponent';

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
        <FaceBox />
      </View>
    );
  }
}

export default HomeComponent;
