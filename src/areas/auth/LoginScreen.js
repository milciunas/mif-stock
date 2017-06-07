import React, { Component } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';

const FlexContainer = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

const FooterWrapper = styled.View`
  flex: 0.4;
  flexDirection: row;
`;

const Button = styled.TouchableOpacity`
  justifyContent: center;
  alignItems: center;
  flex: 1;
  backgroundColor: ${({ color }) => color};
`;

export default class LoginScreen extends Component {
  state = { }
  render() {
    return (
      <FlexContainer>
        <FlexContainer>
          <Text style={Fonts.authTitle}>{'Mobile stocks observation system'}</Text>
        </FlexContainer>
        <FlexContainer>
          <FlexContainer>
            <Text style={Fonts.authWelcomeTitle}>{'Welcome'}</Text>
          </FlexContainer>
          <FlexContainer>
            <Text style={Fonts.authWelcomeText}>{'Start watching stock changes quickly and efficiently'}</Text>
          </FlexContainer>
          <FooterWrapper>
            <Button color={Colors.signBtnBackground}>
              <Text style={Fonts.buttonAuth}>Signup</Text>
            </Button>
            <Button color={Colors.signupBtnBackground}>
              <Text style={Fonts.buttonAuth}>Signin</Text>
            </Button>
          </FooterWrapper>
        </FlexContainer>
      </FlexContainer>
    );
  }
}
