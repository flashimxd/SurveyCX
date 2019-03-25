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
import { Overlay } from 'react-native-elements';
import FormComponent from './FormComponent';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const faces = [
  { id: 5, uri: 'https://i.ibb.co/MkPCcGK/5.png', title: 'Horrible' },
  { id: 4, uri: 'https://i.ibb.co/yf1TB4D/4.png', title: 'Bad' },
  { id: 3, uri: 'https://i.ibb.co/G7qNQTs/3.png', title: 'Normal' },
  { id: 2, uri: 'https://i.ibb.co/zQgSHSd/2.png', title: 'Good' },
  { id: 1, uri: 'https://i.ibb.co/bvRjdS2/1.png', title: 'Awesome' },
];

export default class Facebox extends Component {
  constructor() {
    super();
    this.state = {
      active: 0,
      formActive: false,
      loading: false,
      showModal: false,
    };
    this.springValue = new Animated.Value(1.3);
    this.springValueOff = new Animated.Value(1);
    this.imageOpacityValue = new Animated.Value(1);
    this.imageOpacityValueOff = new Animated.Value(0.6);
  }

  componentWillMount() {
    this.springValue.setValue(1);
    this.imageOpacityValue.setValue(1);
  }

  startFeedback = () => {
    this.setState({ formActive: true });
  };

  finishFeedback = () => {
    this.setState({ formActive: false });
    this.setState({ active: 0 });
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
    this.setState({ active: id });
    this.setState({ showModal: true });
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
    Animated.parallel([
      Animated.timing(this.imageOpacityValue, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
      }),
      Animated.timing(this.imageOpacityValueOff, {
        toValue: 0.6,
        duration: 500,
        easing: Easing.linear,
      }),
      Animated.spring(this.springValue, {
        toValue: 1.3,
      }),
      Animated.spring(this.springValueOff, {
        toValue: 1,
      }),
    ]).start();
    return true;
  }
  render() {
    const { active, formActive, showModal } = this.state;
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
          {faces.map(face => {
            return (
              <TouchableWithoutFeedback onPress={() => this.spring(face.id)} key={face.id}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                  <Animated.Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      padding: 30,
                      opacity:
                        active === face.id ? this.imageOpacityValue : this.imageOpacityValueOff,
                    }}>
                    {face.title}
                  </Animated.Text>
                  <Animated.Image
                    source={{ uri: face.uri }}
                    style={{
                      opacity:
                        active === face.id ? this.imageOpacityValue : this.imageOpacityValueOff,
                      width: 172,
                      height: 173,
                      transform: [
                        { scale: active === face.id ? this.springValue : this.springValueOff },
                      ],
                    }}
                    resizeMode={'contain'}
                  />
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
        {formActive && <FormComponent finishFeedback={() => this.finishFeedback()} />}
        <Overlay isVisible={showModal} width={500} height={300}>
          <Text>Hello from Overlay!</Text>
        </Overlay>
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
  titleOn: {},
});
