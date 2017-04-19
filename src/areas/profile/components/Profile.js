import React, { Component } from 'react';
import { FontAwesome } from 'react-navigation';
import { View, Text } from 'react-native';

class ProfileScreen extends Component {
  static navigationOptions = {
    tabBar: {
      icon: ({ tintColor }) => (
        <FontAwesome name="home" size={25} color={tintColor} />
      )
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>{'Profile Screen'}</Text>
      </View>
    );
  }
}

export default ProfileScreen;
