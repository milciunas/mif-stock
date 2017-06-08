import React from 'react';
import { View } from 'react-native';
import { Button, Icon } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { TabNavigator } from 'react-navigation';
import { HomeScreen, ProfileScreen, GameScreen } from '../areas';
import Colors from '../constants/Colors';

const NavbarDefaultStyle = {
  backgroundColor: Colors.platinumColor
};

export default TabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      headerStyle: NavbarDefaultStyle,
      headerRight: (
        <View style={{ paddingTop: 20 }}>
          <Button transparent>
            <Icon
              name="search"
              style={{
                fontSize: 30,
                color: Colors.whiteColor
              }}
            />
          </Button>
        </View>
      ),
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome
          name="home"
          size={20}
          color={tintColor} />
      )
    })
  },
  Game: {
    screen: GameScreen,
    navigationOptions: {
      headerStyle: NavbarDefaultStyle,
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome
          name="money"
          size={20}
          color={tintColor} />
      )
    }
  },
  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: {
      headerStyle: NavbarDefaultStyle,
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome
          name="user"
          size={20}
          color={tintColor} />
      )
    }
  }
},
  {
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
        height: 40
      }
    }
  }
);
