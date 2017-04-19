import React, { Component } from 'react';
import { FontAwesome } from 'react-navigation';
import { View, Text } from 'react-native';

class GameScreen extends Component {
  static navigationOptions = {
    tabBar: {
      icon: () => (
        <FontAwesome name="home" size={25} />
      )
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>{'Game Screen'}</Text>
      </View>
    );
  }
}

export default GameScreen;
