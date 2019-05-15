import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Button from '../components/commons/ButtonComponent';

class CameraComponent extends React.PureComponent {
  intervalID = 0;
  passedTime = 0;
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      timer: 0,
      limit: 60,
    };
  }
  handlerClick = () => {
    const { isRecording } = this.state;
    return isRecording ? this.stopRecording() : this.startRecord();
  };
  render() {
    const { isRecording, timer, limit } = this.state;
    const { toggle } = this.props;
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.front}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <View style={{ width: 30, height: 30 }}>
            <TouchableOpacity onPress={() => toggle()}>
              <Text style={{ fontSize: 25 }}>X</Text>
            </TouchableOpacity>
          </View>
          <Button
            callBack={() => this.handlerClick()}
            text={isRecording ? timer : ''}
            style={isRecording ? styles.containerStop : styles.containerStart}
          />
        </View>
      </View>
    );
  }

  startRecord = async () => {
    const { isRecording } = this.state;
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      if (!isRecording) {
        this.setState({ isRecording: true });
        this.intervalID = setInterval(() => {
          this.passedTime = this.passedTime + 1;
          if (this.passedTime >= 30) {
            this.stopRecording();
          } else {
            this.setState({ timer: this.passedTime });
          }
        }, 1000);
        const data = await this.camera.recordAsync(options);
        console.log(data); // TODO put into the server api.
      }
    }
  };

  stopRecording = async () => {
    const { isRecording } = this.state;
    if (this.camera) {
      if (isRecording) {
        this.setState({ isRecording: false, timer: 0 });
        clearInterval(this.intervalID);
        await this.camera.stopRecording();
      }
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  containerStart: {
    backgroundColor: 'red',
    height: 70,
    width: 70,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 5,
    padding: 10,
    margin: 10,
  },
  containerStop: {
    backgroundColor: 'red',
    height: 70,
    width: 70,
    borderColor: 'white',
    borderWidth: 5,
    padding: 10,
    margin: 10,
  },
});

export default CameraComponent;
