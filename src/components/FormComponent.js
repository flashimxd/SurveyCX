import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  UIManager,
  LayoutAnimation,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import { Input, Button, AirbnbRating, Icon } from 'react-native-elements';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const questions = [
  {
    id: 1,
    title:
      'How likely is it that you would recommend this Demo Diner to a friend or colleague? Where 0 is not at all likely and 10 is very likely.',
  },
  { id: 2, title: 'How satisfied were you with the food and beverages you were served today?' },
  { id: 3, title: 'How satisfied were you with the service you received from our staff today?' },
  {
    id: 4,
    title:
      'How would you rate the quality of the food that was served to you, where 1 is very poor and 5 is excellent?',
  },
  {
    id: 5,
    title:
      'How would you rate the tide of the store to you, where 1 is very poor and 5 is excellent?',
  },
];

export default class FormComponent extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      showQuestions: false,
      totalQuestions: 5,
      currentQuestion: 0,
      currentRating: 0,
    };
  }
  startSurvey = () => {
    this.setState({ loading: true });

    setInterval(() => {
      this.setState({ loading: false });
      this.setState({ showQuestions: true });
    }, 1000);
  };
  finishSurvey = () => {
    this.setState({ showQuestions: false });
    this.props.finishFeedback();
  };
  form = () => (
    <View
      style={{
        flex: 1,
        width: 100,
        flexDirection: 'column',
        padding: 20,
        height: 250,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Personal Information</Text>
      <Input
        placeholder="Name"
        leftIcon={{ type: 'font-awesome', name: 'user' }}
        inputContainerStyle={{ padding: 10, margin: 20 }}
        inputStyle={{ color: 'black', padding: 10 }}
      />
      <Input
        placeholder="Email"
        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
        inputContainerStyle={{ padding: 10, margin: 20 }}
        inputStyle={{ color: 'black', padding: 10 }}
      />
      <Button
        title="Start"
        buttonStyle={{ width: 300, marginTop: 40 }}
        loading={this.state.loading}
        onPress={() => this.startSurvey()}
      />
    </View>
  );
  previosQuestions = () => {
    const { currentQuestion } = this.state;
    const current = currentQuestion - 1;
    this.setState({ currentQuestion: current });
  };
  nextQuestions = () => {
    const { currentQuestion, totalQuestions } = this.state;
    const current = currentQuestion < totalQuestions && currentQuestion + 1;
    this.setState({ currentQuestion: current });
    console.log(currentQuestion);
    if (currentQuestion >= totalQuestions - 1) {
      Alert.alert(
        'Survey Complete!',
        'Thank you! Now you are in the competition!',
        [
          {
            text: 'Cancel',
            onPress: () => this.finishSurvey(),
            style: 'cancel',
          },
          { text: 'Ok', onPress: () => this.finishSurvey() },
        ],
        { cancelable: false }
      );
    }
  };
  ratingCompleted = rating => {
    console.log(rating);
    console.log('Rating is: ' + rating);
    this.setState({ currentRating: rating });
  };
  showQuestions = () => {
    LayoutAnimation.spring();
    const { currentQuestion, totalQuestions } = this.state;
    // console.log(question);
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          padding: 20,
          alignItems: 'center',
        }}>
        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>
          {`Question: ${currentQuestion + 1} / ${totalQuestions}`}
        </Text>
        <Text style={{ fontWeight: 'bold', fontSize: 20, padding: 20 }}>
          {questions[currentQuestion] ? questions[currentQuestion].title : ''}
        </Text>
        <View style={{ flex: 1, paddingTop: 50, marginBottom: 50 }}>
          <AirbnbRating
            count={5}
            reviews={['Horrible', 'Bad', 'Normal', 'Good', 'Awesome']}
            defaultRating={3}
            size={50}
            onFinishRating={rating => this.ratingCompleted(rating)}
          />
        </View>
        <View
          style={{
            flex: 1,
            paddingTop: 50,
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '100%',
          }}>
          {currentQuestion >= 1 && (
            <TouchableWithoutFeedback onPress={() => this.previosQuestions()}>
              <View style={{ flexDirection: 'row' }}>
                <Icon size={40} name="chevron-left" type="font-awesome" />
                <Text style={{ fontSize: 20, padding: 5 }}>Previous</Text>
              </View>
            </TouchableWithoutFeedback>
          )}

          <TouchableWithoutFeedback onPress={() => this.nextQuestions()}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 20, padding: 5 }}>
                {currentQuestion < 4 ? 'Next' : 'Finish'}
              </Text>
              <Icon size={40} name="chevron-right" type="font-awesome" />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  };
  shouldComponentUpdate() {
    LayoutAnimation.spring();
    return true;
  }
  render() {
    return (
      <View style={styles.boxContainer}>
        {this.state.showQuestions ? this.showQuestions() : this.form()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxContainer: {
    flex: 1,
    backgroundColor: '#fff',
    height: 400,
    width: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowRadius: 20,
    elevation: 4,
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    alignSelf: 'center',
  },
});
