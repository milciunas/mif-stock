import React from 'react';
import Expo, { Font } from 'expo';
import EStyleSheet from 'react-native-extended-stylesheet';
import Colors from './constants/Colors';
import Root from './areas/Root';

EStyleSheet.build(Colors);

export default class App extends React.Component {
  state = {
    fontLoaded: false
  }

  async componentDidMount() {
    await Font.loadAsync({
      sansBold: require('./assets/fonts/PT_Sans-Web-Bold.ttf'),
      sansBoldItalic: require('./assets/fonts/JuliusSansOne-Regular.ttf')
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    if (this.state.fontLoaded) {
      return (
        <Root />
      );
    } else {
      return null;
    }
  }
}

Expo.registerRootComponent(App);
