import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class CurrencyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{'Currency Converter'}</Text>
        <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10 }}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
            keyboardType="numeric"
            defaultValue="0.00$"
            keyboardAppearance="dark"
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  textInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 15,
    paddingRight: 15
  }
});
