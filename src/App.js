import React from 'react';
import { StyleSheet, ActivityIndicator, Text, View } from 'react-native';
import NavigationBar from 'react-native-navbar';
import { fetchStocks } from './constants/api';

export default class App extends React.Component {
  static defaultProps = {
    fetchStocks
  }

  state = {
    loading: false,
    stocks: []
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const data = await this.props.fetchStocks();
    console.log('daaata', data)
    setTimeout(() => this.setState({ loading: false, stocks: data.stocks}), 200);
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.screen}>
          <ActivityIndicator size={'large'} />
        </View>
      )
    }
    console.log('this.state.stocks: ', this.state.stocks);
    return (
      <View style={styles.screen}>
        <View style={styles.container}>
          <Text>
            Some text
          </Text>

          {this.state.stocks.map((stock, i) => (
            <Text key={i}>{stock.symbol}</Text>
          ))}
        </View>
      </View>
    );
    }
}

const styles = StyleSheet.create({
  navbaar: {
    flex: 1,
    paddingTop: 50,
    paddingRight: 50,
    paddingLeft: 50
  },
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
