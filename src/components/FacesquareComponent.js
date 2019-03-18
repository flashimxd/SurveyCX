import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Animated, Easing, Alert } from 'react-native';

export default class Facesquare extends Component {
  constructor() {
    super();
    this.state = {
      active: 0,
    };
    this.springValue = new Animated.Value(1);
    this.springValueOff = new Animated.Value(1.3);
    this.imageOpacityValue = new Animated.Value(0.6);
  }

  confirmNps = () => {
    Alert.alert(
      'Would you mind to help us to improve ??',
      'Answer some question about our service, and enter the competition!!',
      [
        {
          text: 'No, Thanks',
          onPress: () => console.log('No, Thanks'),
          style: 'cancel',
        },
        { text: 'Yes, Lets go!', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    );
  };

  spring = id => {
    // console.log(this.view);
    // console.log(id);
    this.setState({ active: id });
    const { active } = this.state;

    Animated.parallel([
      Animated.timing(this.imageOpacityValue, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
      }),
      Animated.spring(this.springValue, {
        toValue: 1.3,
      }),
    ]).start();

    setTimeout(() => {
      Alert.alert(
        'Feedback Survey',
        'Confirm ?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'Yes', onPress: () => this.confirmNps() },
        ],
        { cancelable: false }
      );
    }, 1000);
  };
  render() {
    const { uri, id } = this.props;
    const imageOpacityStyle = {
      opacity: this.imageOpacityValue,
    };
    const { active } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={() => this.spring(id)}>
          <Animated.Image
            id={id}
            source={{ uri }}
            style={[
              imageOpacityStyle,
              {
                width: 172,
                height: 173,
                transform: [{ scale: this.springValue }],
              },
            ]}
            resizeMode={'contain'}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
