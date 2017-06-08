import React, { Component } from 'react';
import { Text, View, ListView, TouchableOpacity, RefreshControl } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { connect } from 'react-redux';
import { fetchYahooFinance } from '../actions';

import { LoadingScreen } from '../../common';
import styles from '../styles/HomeScreen';

@connect(
  state => ({
    finance: state.home.finance
  }),
  { fetchYahooFinance })
export default class HomeScreenPure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    };

    this.dataSource = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
  }

  componentDidMount() {
    this.props.fetchYahooFinance();
  }

  MapStocks(data) {
    const stocks = data.map((item) => ({
      symbol: item.symbol,
      bid: item.Bid,
      ask: item.Ask,
      changeInPercent: item.ChangeinPercent,
      change: item.Change,
      currency: item.Currency,
      name: item.Name,
      lastPrice: item.LastTradePriceOnly,
      lastTradeTime: item.LastTradeTime,
      daysRange: item.DaysRange,
      open: item.Open,
      volume: item.Volume,
      volumeAvg: item.AverageDailyVolume,
      marketCap: item.MarketCapitalization,
      peRatio: item.PERatio,
      dividendYield: item.DividendYield
    }));

    console.log('NOT DESTRUCTED: ', data);

    return stocks;
  }

  _renderRow(rowData) {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flexDirection: 'column' }}>
        <TouchableOpacity onPress={() => navigate('StockDetails', rowData)}>
          <View style={styles.stocksContainer}>
              <View style={{ flex: 0.7 }}>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={{ fontFamily: 'sansBold' }}>{`${rowData.name}`}</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <FontAwesome
                      name="clock-o"
                      size={16}
                      color="green"
                      style={{ alignSelf: 'center' }} />
                    <Text>{` ${rowData.lastTradeTime}`}</Text>
                  </View>
                </View>
              </View>
              <View style={{ flex: 0.3 }}>
                <Text>{`Price: ${rowData.lastPrice}`}</Text>
                <Text style={{ color: 'green' }}>{`${rowData.change}`}{`(${rowData.changeInPercent})`}</Text>
              </View>
          </View>
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>
    );
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.props.fetchYahooFinance().then(() => {
      this.setState({
        refreshing: false
      });
    });
  }

  render() {
    const {
      finance: {
        isFetched,
        data,
        error
      }
    } = this.props;

    if (!isFetched) {
      return (
        <LoadingScreen />
      );
    } else if (error.on) {
      return (
        <View>
          <Text>{error.message}</Text>
        </View>
      );
    }
    const destructed = this.MapStocks(data);

    return (
      <View style={styles.root}>
        <View style={styles.topContainer}>
          <Text style={{ fontSize: 18, textAlign: 'center', fontFamily: 'sansBold' }}>
            {'Mobile stocks observation system'}
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          {
            !isFetched ? null :
              <ListView
                dataSource={this.dataSource.cloneWithRows(destructed)}
                renderRow={(rowData) => this._renderRow(rowData)}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this._onRefresh(this)} />
                }
              />
          }
        </View>
      </View>
    );
  }
}

