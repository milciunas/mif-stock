import React, { Component } from 'react';
import { Facebook, Google } from 'expo';
import { Text, Alert } from 'react-native';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';

import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import fbConfig from '../../constants/fbConfig';
import googleConfig from '../../constants/googleConfig';

const FlexContainer = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
  alignSelf: stretch;
`;

const FooterWrapper = styled.View`
  flex: 0.2;
  flexDirection: row;
`;

const Button = styled.TouchableOpacity`
  justifyContent: center;
  alignItems: center;
  flex: 1;
  backgroundColor: ${({ color }) => color};
  flexDirection: row;
`;

const Stock = styled.Text`
  fontFamily: 'sansBold';
  fontSize: 20;
`;

export default class LoginScreen extends Component {
  state = { }

  _onLoginPress = name => {
    if (name === 'facebook') {
      this._logInWithFacebook();
    } else {
      this._logInWithGoogle();
    }
  }

  async _logInWithFacebook() {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(fbConfig.APP_ID, {
      permissions: ['public_profile', 'email']
    });

    if (type === 'success') {
      const resp = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );
      Alert.alert('Logged In!', `Hi ${(await resp.json()).name}`);
    }
  }

  async _logInWithGoogle() {
    try {
      const resp = await Google.logInAsync({
        androidClientId: googleConfig.CLIENT_ID_ANDROID,
        scopes: ['profile', 'email']
      });

      if (resp.type === 'success') {
        Alert.alert(`Logged in with google, ${resp.accessToken}`);
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      throw e;
    }
  }

  render() {
    return (
      <FlexContainer>
        <FlexContainer>
          <Text style={Fonts.authTitle}>{'Mobile stocks observation system'}</Text>
        </FlexContainer>
        <FlexContainer>
          <FlexContainer>
            <Text style={Fonts.authWelcomeText}>{'Start watching'} <Stock style={{ color: Colors.platinumColor }}>Stock</Stock> {'changes quickly and efficiently'}</Text>
          </FlexContainer>
          <FooterWrapper>
            <Button color={Colors.googleBtnBackground} onPress={() => this._onLoginPress('google')}>
              <Text style={Fonts.buttonAuth}>Connect with</Text>
              <FontAwesome
                name="google-plus-official"
                size={32}
                color='#fff'
                style={{ paddingLeft: 10 }} />
            </Button>
            <Button color={Colors.fbBtnBackground} onPress={() => this._onLoginPress('facebook')}>
              <Text style={Fonts.buttonAuth}>Connect with</Text>
              <FontAwesome
                name="facebook-official"
                size={32}
                color='#fff'
                style={{ paddingLeft: 10 }} />
            </Button>
          </FooterWrapper>
        </FlexContainer>
      </FlexContainer>
    );
  }
}
