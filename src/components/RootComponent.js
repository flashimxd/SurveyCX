import React, { Component } from 'react';
import { View } from 'react-native';
import AppContainer from '../navigators/AppContainer';

class RootComponent extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppContainer />
      </View>
    );
  }
}

export default RootComponent;
