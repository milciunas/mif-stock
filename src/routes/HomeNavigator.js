import React from 'react';
import { View } from 'react-native';
import { Button, Icon } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { TabNavigator } from 'react-navigation';
import { HomeScreen, ProfileScreen, GameScreen } from '../areas';
import Colors from '../constants/Colors';
import styled from 'styled-components/native';

const NavbarDefaultStyle = {
  backgroundColor: Colors.platinumColor
};

export default TabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      header: null,
      headerStyle: NavbarDefaultStyle,
      // headerRight: (
      //   <View style={{ paddingTop: 20 }}>
      //     <Button transparent>
      //       <Icon
      //         name="search"
      //         style={{
      //           fontSize: 30,
      //           color: Colors.whiteColor
      //         }}
      //       />
      //     </Button>
      //   </View>
      // ),
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome
          name="home"
          size={16}
          color={tintColor}
          style={{ marginBottom: 10 }} />
      )
    })
  },
  Game: {
    screen: GameScreen,
    navigationOptions: {
      header: null,
      headerStyle: NavbarDefaultStyle,
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome
          name="suitcase"
          size={16}
          color={tintColor}
          style={{ marginBottom: 10 }} />
      )
    }
  },
  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: {
      header: null,
      headerStyle: NavbarDefaultStyle,
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome
          name="address-card-o"
          size={16}
          color={tintColor}
          style={{ marginBottom: 10 }} />
      )
    }
  }
},
  {
    headerMode: 'screen',
    swipeEnabled: true,
    animationEnable: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      inactiveTintColor: Colors.blackColor,
      activeTintColor: Colors.platinumColor,
      indicatorStyle: {
        backgroundColor: Colors.platinumColor
      },
      style: {
        backgroundColor: '#fff',
        height: 35
      }
    }
  }
);
