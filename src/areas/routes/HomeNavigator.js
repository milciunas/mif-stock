import { TabNavigator } from 'react-navigation';
import { HomeScreen, ProfileScreen, GameScreen } from '../../areas';
import Colors from '../../constants/Colors';

export default TabNavigator({
  Home: {
    screen: HomeScreen
  },
  Game: {
    screen: GameScreen
  },
  ProfileScreen: {
    screen: ProfileScreen
  }
},
  {
    swipeEnabled: true,
    animationEnable: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      // showLabel: false
      inactiveTintColor: Colors.blackColor,
      activeTintColor: Colors.platinumColor,
      indicatorStyle: {
        backgroundColor: Colors.platinumColor
      },
      style: {
        backgroundColor: '#fff'
      }
    }
  }
);
