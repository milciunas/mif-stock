import React from 'react';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { TabNavigator } from 'react-navigation';
import { HomeScreen, CurrencyScreen, PortfolioScreen } from '../areas';
import Colors from '../constants/Colors';

const NavbarDefaultStyle = {
  backgroundColor: Colors.platinumColor
};

export default TabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      header: null,
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome
          name="home"
          size={16}
          color={tintColor}
          style={{ marginBottom: 10 }} />
      )
    })
  },
  Portfolio: {
    screen: PortfolioScreen,
    navigationOptions: {
      header: null,
      headerStyle: NavbarDefaultStyle,
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons
          name="briefcase"
          size={16}
          color={tintColor}
          style={{ marginBottom: 10 }} />
      )
    }
  },
  Currency: {
    screen: CurrencyScreen,
    navigationOptions: {
      header: null,
      headerStyle: NavbarDefaultStyle,
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons
          name="currency-usd"
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
