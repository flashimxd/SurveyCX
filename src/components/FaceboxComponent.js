import React, { Component } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  Alert,
  Easing,
  Text,
  StyleSheet,
  ImageBackground,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import FormComponent from './FormComponent';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const faces = [
  { id: 1, uri: 'https://i.ibb.co/bvRjdS2/1.png' },
  { id: 2, uri: 'https://i.ibb.co/zQgSHSd/2.png' },
  { id: 3, uri: 'https://i.ibb.co/G7qNQTs/3.png' },
  { id: 4, uri: 'https://i.ibb.co/yf1TB4D/4.png' },
  { id: 5, uri: 'https://i.ibb.co/MkPCcGK/5.png' },
];

export default class Facebox extends Component {
  constructor() {
    super();
    this.state = {
      active: 0,
      formActive: false,
      loading: false,
    };
    this.springValue = new Animated.Value(1);
    this.springValueOff = new Animated.Value(1.3);
    this.imageOpacityValue = new Animated.Value(1);
  }

  startFeedback = () => {
    this.setState({ formActive: true });
    LayoutAnimation.spring();
  };

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
        { text: 'Yes, Lets go!', onPress: () => this.startFeedback() },
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
    }, 500);
  };
  shouldComponentUpdate() {
    LayoutAnimation.spring();
    return true;
  }
  render() {
    const { uri, id } = this.props;
    const imageOpacityStyle = {
      opacity: this.imageOpacityValue,
    };
    const { active, formActive } = this.state;
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flex: 1 }}>
          <ImageBackground
            source={require('../assets/images/retail.jpg')}
            style={{ width: '100%', height: '100%' }}>
            <View
              style={{
                marginTop: '10%',
                width: '100%',
                height: 200,
                alignItems: 'center',
                backgroundColor: 'white',
                alignSelf: 'center',
                opacity: 0.6,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.2,
                shadowRadius: 20,
                elevation: 3,
              }}>
              <View style={{ flex: 1, flexDirection: 'column', padding: 10 }}>
                <Text
                  style={{
                    flex: 1,
                    fontWeight: 'bold',
                    fontSize: 60,
                    alignSelf: 'center',
                  }}>
                  How was our service today?
                </Text>
                <Text
                  style={{
                    flex: 1,
                    fontWeight: 'bold',
                    fontSize: 40,
                    alignSelf: 'center',
                  }}>
                  Help us to improve our service with a quick feedback.
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.boxContainer}>
          {faces.map(face => (
            <TouchableWithoutFeedback onPress={() => this.spring(face.id)} key={face.id}>
              <Animated.Image
                id={face.id}
                source={{ uri: face.uri }}
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
          ))}
        </View>
        {formActive && <FormComponent />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxContainer: {
    backgroundColor: '#fff',
    height: 100,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 3,
    alignItems: 'center',
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
