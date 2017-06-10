import React from 'react';
import { StackNavigator } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';
import Touchable from '@appandflow/touchable';
import styled from 'styled-components/native';

import HomeNavigator from './HomeNavigator';
import {
  StockDetailsScreen
} from '../areas';
import Colors from '../constants/Colors';

const CloseButton = styled(Touchable)`
  marginLeft: 10;
`;

export default StackNavigator({
  Home: {
    screen: HomeNavigator
  },
  StockDetails: {
    screen: StockDetailsScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: Colors.platinumColor
      },
      title: 'Stock details',
      titleStyle: {
        color: Colors.whiteColor
      },
      headerTintColor: Colors.whiteColor,
      headerLeft: (
        <CloseButton feedback="opacity" onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="close"
            color="#fff"
            size={30}
          />
        </CloseButton>
      )
    })
  }
});
