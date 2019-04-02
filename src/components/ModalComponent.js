import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Overlay, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

export default props => {
  const {
    btnOkCallback,
    btnCancelCallback,
    btnCancelTitle,
    btnOkTitle,
    title,
    description,
  } = props;
  return (
    <Overlay
      isVisible={props.show}
      width={props.width}
      height={props.height}
      borderRadius={20}
      animationType="slide"
      transparent
      overlayBackgroundColor="white">
      <View style={styles.container}>
        <React.Fragment>
          <Animatable.Text animation="slideInLeft" style={styles.titleText}>
            {title}
          </Animatable.Text>
          <Animatable.Text animation="slideInRight" style={styles.descriptionText}>
            {description}
          </Animatable.Text>
          <Animatable.View animation="fadeInUpBig" style={styles.animatableView}>
            <Button
              icon={<Icon name="check-circle" size={15} color="white" />}
              title={btnOkTitle}
              buttonStyle={
                ([styles.buttonStyle], !btnCancelCallback ? { width: 400 } : { width: 200 })
              }
              onPress={() => btnOkCallback()}
            />
            {btnCancelCallback && (
              <Button
                title={btnCancelTitle}
                type="outline"
                titleStyle={{ color: '#27989f' }}
                buttonStyle={styles.buttonStyle}
                onPress={() => btnCancelCallback()}
              />
            )}
          </Animatable.View>
        </React.Fragment>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  descriptionText: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 20,
  },
  animatableView: {
    paddingTop: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '90%',
  },
  buttonStyle: {
    width: 200,
    borderColor: '#27989f',
  },
});
