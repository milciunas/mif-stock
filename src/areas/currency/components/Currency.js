import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ListView,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Image,
  Keyboard
} from 'react-native';

import { fetchRates } from '../../../constants/Api';
import CurrencySelection from './CurrencySelection';
import CurrencyData from './CurrencyData';
import LoadingScreen from '../../common/LoadingScreen';

import Colors from '../../../constants/Colors';

const highlightColor = '#ececec';
const borderColor = '#c2c2c2';

function calculateRate(input, inputRate, outputRate) {
  const exchangeRate = inputRate / outputRate;
  return (input * exchangeRate);
}

export default class CurrencyScreen extends Component {
  constructor(props) {
    super(props);

    fetchRates((rates) => {
      this.setState({
        rates,
        loading: false,
        inputValue: '1.00',
        outputValue: rates.get('USD').rate.toFixed(2).toString(),
        dataSource: dataSource.cloneWithRows(Array.from(rates.values()))
      });
    });

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.code !== r2.code
    });

    this.state = {
      loading: true,
      inputCurrency: 'EUR',
      outputCurrency: 'USD',
      activeCurrency: false,
      inputValue: '0.00',
      outputValue: '0.00',
      rates: new Map(),
      dataSource: dataSource.cloneWithRows([]),
      keyboardVisible: false
    };
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow() {
    this.setState({
      keyboardVisible: true
    });
  }

  keyboardDidHide() {
    this.setState({
      keyboardVisible: false
    });
  }

  title() {
    // if (this.state.keyboardVisible) {
    //   return null;
    // }
    return (
      <View style={styles.title}>
        <Text style={styles.titleText}>{'Currency Converter'}</Text>
      </View>
    );
  }

  converter() {
    if (this.state.loading) { return null; }
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.container, { backgroundColor: Colors.alabasterColor }]}>
          <View style={{ flex: 0.2, width: '100%', margin: 100 }}>
            {this.title()}
          </View>
          <View style={styles.inner}>
            <View style={{ flexDirection: 'row' }}>
              <TextInput
                style={styles.textInput}
                keyboardType="numeric"
                keyboardAppearance="dark"
                underlineColorAndroid="transparent"
                onChangeText={(inputValue) => {
                  const inputRate = this.state.rates.get(this.state.inputCurrency);
                  const outputRate = this.state.rates.get(this.state.outputCurrency);
                  const calculatedRate = calculateRate(parseFloat(inputValue), inputRate.rate, outputRate.rate);
                  const outputValue = Number.isNaN(calculatedRate) ? '0.00' : calculatedRate.toFixed(2).toString();
                  this.setState({
                    inputValue,
                    outputValue
                  });
                }}
                value={this.state.inputValue}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableHighlight
                style={styles.picker}
                onPress={() => this.setState({ activeCurrency: 'input' })}
                underlayColor={highlightColor}>
                <View style={currency.container}>
                  <Image
                    style={currency.flag}
                    source={CurrencyData[this.state.inputCurrency].flag} />
                  <Text style={currency.label}>{CurrencyData[this.state.inputCurrency].label}</Text>
                </View>
              </TouchableHighlight>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TextInput
                style={styles.textInput}
                keyboardType="numeric"
                keyboardAppearance="dark"
                underlineColorAndroid="transparent"
                value={this.state.outputValue}
                onChangeText={(outputValue) => {
                  const inputRate = this.state.rates.get(this.state.inputCurrency);
                  const outputRate = this.state.rates.get(this.state.outputCurrency);
                  const inputValue = calculateRate(parseFloat(outputValue), inputRate.rate, outputRate.rate);
                  this.setState({
                    inputValue: inputValue.toFixed(2).toString(),
                    outputValue
                  });
                }}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableHighlight
                style={styles.picker}
                onPress={() => this.setState({ activeCurrency: 'output' })}
                underlayColor={highlightColor}>
                <View style={currency.container}>
                  <Image
                    style={currency.flag}
                    source={CurrencyData[this.state.outputCurrency].flag} />
                  <Text style={currency.label}>{CurrencyData[this.state.outputCurrency].label}</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  loader() {
    if (this.state.loading) {
      return <LoadingScreen />;
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.loader()}
        {this.converter()}
        <CurrencySelection
          visible={this.state.activeCurrency !== false}
          dataSource={this.state.dataSource}
          selectCurrency={(code) => {
            let inputCurrency = this.state.inputCurrency;
            let outputCurrency = this.state.outputCurrency;

            if (this.state.activeCurrency === 'input') {
              inputCurrency = code;
            } else {
              outputCurrency = code;
            }

            const inputValue = parseFloat(this.state.inputValue);
            const inputRate = this.state.rates.get(inputCurrency);
            const outputRate = this.state.rates.get(outputCurrency);
            const outputValue = calculateRate(inputValue, inputRate.rate, outputRate.rate);

            this.setState({
              activeCurrency: false,
              inputCurrency,
              outputCurrency,
              outputValue: outputValue.toFixed(2).toString()
            });
          }}
        />
      </View>
    );
  }

  // render() {
  //   const { navigate } = this.props.navigation;
  //   return (
  //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //       <Text>{'Currency Converter'}</Text>
  //       <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10 }}>
  //         <TextInput
  //           style={styles.textInput}
  //           onChangeText={(text) => this.setState({ text })}
  //           value={this.state.text}
  //           keyboardType="numeric"
  //           maxLength={20}
  //           multiline={false}
  //           underlineColorAndroid="transparent"
  //         />
  //       </View>
  //       <Button
  //         title="Currency"
  //         onPress={() => navigate('CurrencySelection')} />
  //     </View>
  //   );
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor,
    padding: 8,
    width: '100%'
  },
  titleText: {
    fontSize: 30,
    fontWeight: '600',
    fontFamily: 'sansBold',
    color: Colors.platinumColor
  },
  inner: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  picker: {
    width: '100%',
    height: 52,
    padding: 8,
    borderColor,
    borderWidth: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 8
  },
  textInput: {
    flex: 1,
    fontSize: 24,
    width: '100%',
    padding: 8,
    color: 'black',
    borderColor,
    borderWidth: 1,
    marginTop: 8
  }
});

const currency = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  flag: {
    width: 40,
    height: 40,
    marginRight: 16
  },
  label: {
    fontSize: 16
  }
});
