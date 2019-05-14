import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Overlay, Button } from 'react-native-elements';
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
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.descriptionText}>{description}</Text>
          <Animatable.View animation="fadeIn" style={styles.animatableView}>
            <Button
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
    padding: 10,
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
