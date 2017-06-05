import React, { Component } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { View, Text } from 'react-native';

class ProfileScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: (color) => (
      <FontAwesome name="user" size={20} tintColor={color} />
    )
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
