import React, { Component } from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';

import { LoginScreen } from '../areas';
import Navigator from './Navigator';

@connect(
  state => ({
    navigation: state.navigation,
    user: state.user
  })
)

export default class AppNavigator extends Component {
  state = { }
  render() {
    const navigation = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.state
    });

    if (this.props.user.logged) {
      return <Navigator navigation={navigation} />;
    }

    return <LoginScreen />;
  }
}

export const router = Navigator.router;
