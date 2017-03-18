import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavigationBar from 'react-native-navbar';

export default class App extends React.Component {
  render() {
  const rightButtonConfig = {
  title: 'Next',
  handler: () => alert('hello!'),
  };
  const titleConfig = {
    title: 'Hello, world',
  };
    return (
      <View style={styles.screen}>
        <View style={styles.navbaar}>
          <NavigationBar
          title={titleConfig}
          rightButton={rightButtonConfig}/>
        </View>
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Changes you make will automatically reload.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navbaar: {
    flex: 1,
    paddingTop: 50,
    paddingRight: 50,
    paddingLeft: 50
  },
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
