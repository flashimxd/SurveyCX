import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Animated, Easing, Text, StyleSheet } from 'react-native';
import FormComponent from './FormComponent';
import Modal from './ModalComponent';
import CameraComponent from './CameraComponent';

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
      showForm: false,
      loading: false,
      showModal: false,
      showModalRefuse: false,
      showCamera: false,
    };
    this.springValue = new Animated.Value(1);
    this.springValueOff = new Animated.Value(1.3);
    this.imageOpacityValue = new Animated.Value(0.6);
    this.imageOpacityValueOff = new Animated.Value(1);
  }

  startFeedback = () => {
    this.setState({ showModal: false });
    this.setState({ showForm: true });
  };

  finishFeedback = () => {
    this.setState({ showForm: false });
    this.setState({ active: 0 });
  };

  toogleCamera = () => {
    this.setState({ showCamera: !this.state.showCamera });
  };

  confirmNps = () => {
    this.setState({ showModal: false, showModalCompetition: true });
  };
  finishFeedbackNotAccept = () => {
    this.setState({ active: 0 });
    this.setState({ showModal: false });

    setTimeout(() => {
      this.setState({ showModalRefuse: true });
    }, 1000);
  };
  spring = id => {
    console.log(id);
    if (id === 1 || id === 2) {
      this.toogleCamera();
    } else {
      this.setState({ active: id });

      this.springValue.setValue(1.3);
      this.imageOpacityValue.setValue(1);

      setTimeout(() => {
        this.setState({ showModal: true });
      }, 1000);
    }
  };
  cancelFeedback = () => {
    this.setState({ active: 0, showModal: false });
  };

  hideModalRefuseSurvey = () => {
    this.setState({ showModalRefuse: false });
  };

  titleScreenRender = () => {
    const { active, showForm, showModal } = this.state;
    return (
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#27989f' }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.2,
              shadowRadius: 20,
              elevation: 3,
              backgroundColor: '#27989f',
            }}>
            <View
              style={{
                flex: 1,
                width: 700,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 60,
                  color: 'white',
                }}>
                How was your checkout experience today?
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.boxContainer}>
          {faces.map(face => {
            return (
              <TouchableWithoutFeedback onPress={() => this.spring(face.id)} key={face.id}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                  <Animated.Image
                    source={{ uri: face.uri }}
                    style={{
                      opacity:
                        active === face.id ? this.imageOpacityValue : this.imageOpacityValueOff,
                      width: 162,
                      height: 162,
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
        {showForm && <FormComponent finishFeedback={() => this.finishFeedback()} />}
        {showModal && this.modalAcceptSurvey()}
      </View>
    );
  };
  modalRefuseSurvey = () => (
    <Modal
      show={this.state.showModalRefuse}
      width={500}
      height={300}
      title="Thank you!"
      description=" You vote was registered, thank you for your time!"
      btnOkTitle="Finish"
      btnOkCallback={() => this.hideModalRefuseSurvey()}
    />
  );

  modalAcceptSurvey = () => (
    <Modal
      show={this.state.showModal}
      width={500}
      height={300}
      title="Thank you!"
      description="Would you mind answering a few more questions to be in with a chance to win €100 voucher ?"
      btnOkTitle="Yes"
      btnCancelTitle="No"
      btnOkCallback={() => this.startFeedback()}
      btnCancelCallback={() => this.finishFeedbackNotAccept()}
    />
  );

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.active !== this.state.active) {
      this.springValueOff.setValue(1.3);
      this.imageOpacityValueOff.setValue(1);

      Animated.parallel([
        Animated.spring(this.springValueOff, {
          toValue: 1,
          friction: 1,
        }),
        Animated.timing(this.imageOpacityValueOff, {
          toValue: 0.6,
          duration: 500,
          easing: Easing.linear,
        }),
      ]).start();
    }

    return true;
  }

  render() {
    const { showCamera } = this.state;
    return !showCamera ? (
      this.titleScreenRender()
    ) : (
      <CameraComponent toggle={() => this.toogleCamera()} />
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
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
