import React, { Component } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { View, Text } from 'react-native';

class GameScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Game',
    tabBarIcon: () => (
      <FontAwesome name="money" size={20} />
    )
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
