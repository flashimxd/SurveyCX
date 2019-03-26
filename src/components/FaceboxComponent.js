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
import { Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import FormComponent from './FormComponent';
import Modal from './ModalComponent';

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
      showModalCompetition: false,
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
    this.setState({ showModalCompetition: false });
    this.setState({ formActive: true });
  };

  finishFeedback = () => {
    this.setState({ formActive: false });
    this.setState({ active: 0 });
  };

  confirmNps = () => {
    this.setState({ showModal: false, showModalCompetition: true });

    /*
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
    */
  };
  spring = id => {
    this.setState({ active: id });
    this.setState({ showModal: true });
  };
  modalConfirmFeedback = showModal => {
    const { active } = this.state;
    const option = faces.find(el => el.id === active);
    return (
      <Modal show={showModal} width={500} height={300}>
        <React.Fragment>
          <Animatable.Text animation="slideInLeft" style={{ fontWeight: 'bold', fontSize: 30 }}>
            Are you sure?
          </Animatable.Text>
          <Animatable.Text animation="slideInRight" style={{ fontSize: 30 }}>
            You vote:
          </Animatable.Text>
          <Animatable.Text animation="slideInUp" style={{ fontWeight: 'bold', fontSize: 25 }}>
            {option.title}
          </Animatable.Text>
          <Animatable.View
            animation="fadeInUpBig"
            style={{
              paddingTop: 50,
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: '90%',
            }}>
            <Button
              icon={<Icon name="check-circle" size={15} color="white" />}
              title="Confirm"
              buttonStyle={{ width: 200 }}
              onPress={() => this.confirmNps()}
            />
            <Button
              title="Cancel"
              type="outline"
              buttonStyle={{ width: 200 }}
              onPress={() => this.setState({ showModal: false })}
            />
          </Animatable.View>
        </React.Fragment>
      </Modal>
    );
  };

  modalAcceptSurvey = showModal => {
    return (
      <Modal show={showModal} width={500} height={300}>
        <React.Fragment>
          <Animatable.Text animation="slideInLeft" style={{ fontWeight: 'bold', fontSize: 30 }}>
            Would you mind to help us to improve ??
          </Animatable.Text>
          <Animatable.Text animation="slideInRight" style={{ fontSize: 30 }}>
            Answer some question about our service, and enter the competition!!
          </Animatable.Text>
          <Animatable.View
            animation="fadeInUpBig"
            style={{
              paddingTop: 50,
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: '90%',
            }}>
            <Button
              icon={<Icon name="check-circle" size={15} color="white" />}
              title="Yes, Lets go!"
              buttonStyle={{ width: 200 }}
              onPress={() => this.startFeedback()}
            />
            <Button
              title="No, Thanks"
              type="outline"
              buttonStyle={{ width: 200 }}
              onPress={() => this.setState({ showModalCompetition: false })}
            />
          </Animatable.View>
        </React.Fragment>
      </Modal>
    );
  };

  shouldComponentUpdate() {
    LayoutAnimation.spring();
    Animated.parallel([
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
    const { active, formActive, showModal, showModalCompetition } = this.state;
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
                  Help us to improve our service with a quick Survey.
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
        {showModal && this.modalConfirmFeedback(showModal)}
        {showModalCompetition && this.modalAcceptSurvey(showModalCompetition)}
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
