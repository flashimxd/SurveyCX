import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default ({ text, playerStyle, callBack }) => (
  <TouchableOpacity onPress={callBack}>
    <View style={styles.container}>
      <Text style={styles.textStyle}>{text}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    height: 70,
    width: 70,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 5,
    padding: 10,
    margin: 10,
    justifyContent: 'center',
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
  textStyle: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});
