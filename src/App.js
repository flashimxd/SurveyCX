import React, { Component } from 'react';
import { ThemeProvider } from 'react-native-elements';
import RootComponent from './components/RootComponent';

export default class App extends Component {
  render() {
    return (
      <ThemeProvider>
        <RootComponent />
      </ThemeProvider>
    );
  }
}
