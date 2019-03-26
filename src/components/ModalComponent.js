import React from 'react';
import { View } from 'react-native';
import { Overlay } from 'react-native-elements';

export default props => (
  <Overlay isVisible={props.show} width={props.width} height={props.height} borderRadius={20}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {props.children}
    </View>
  </Overlay>
);
