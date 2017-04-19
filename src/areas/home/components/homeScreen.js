import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { fetchYahooFinance } from '../../../constants/api';
import styles from '../styles/homeScreen';

class HomeScreenPure extends React.Component {
  static defaultProps = {
    fetchYahooFinance,
  }

  state = {
    loading: false,
    stocks: [],
    yahooData: [],
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const data = await this.props.fetchYahooFinance();
    this.setState({ loading: false, yahooData: data.query.results.quote });
  }

  MapStocks() {
    const temp = [];
    const yahooStocks = this.state.yahooData.length < 2
      ? this.state.yahooData
      : [this.state.yahooData];
    return yahooStocks.map(function (stocks, i) {
      stocks.forEach(function (element) {
        temp.push({ symbol: element.symbol, ask: element.Ask });
      }, this);
      console.log('teeeeeemp', temp);
      return temp;
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.root}>
          <ActivityIndicator size={'large'} />
        </View>
      );
    }
    return (
      <View style={styles.root}>
        <Text>{'Home screen'}</Text>
      </View>
    );
  }
}

export const HomeScreen = HomeScreenPure;

