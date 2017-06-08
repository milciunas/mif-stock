import React, { Component } from 'react';
import { Text, View, ListView } from 'react-native';

import { connect } from 'react-redux';
import { fetchYahooFinance } from '../actions';

import { LoadingScreen } from '../../common';
import styles from '../styles/HomeScreen';
import Colors from '../../../constants/Colors';

@connect(
  state => ({
    finance: state.home.finance
  }),
  { fetchYahooFinance })
export default class HomeScreenPure extends Component {
  constructor(props) {
    super(props);
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
      lastPrice: item.LastTradePriceOnly
    }));

    console.log('NOT DESTRUCTED: ', data);

    return stocks;
  }

  _renderRow(rowData) {
    return (
      <View style={{ flexDirection: 'column' }}>
        <Text style={{ alignSelf: 'center', flexDirection: 'row', fontSize: 16, fontFamily: 'sansBold', color: Colors.platinumColor }}>
          {`${rowData.name}`}{` (${rowData.symbol})`}
        </Text>
        <View style={styles.titleSep} />
        <View style={styles.stocksContainer}>
          <Text style={{ color: 'black' }}>{`BID: ${rowData.lastPrice} `} </Text>
          <Text style={{ color: 'green' }}>{`${rowData.change}`}</Text>
          <Text style={{ color: 'green' }}>{`${rowData.changeInPercent}`}</Text>
        </View>
        <View style={styles.separator} />
      </View>
    );
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
          <Text style={{ fontSize: 16, textAlign: 'center', fontFamily: 'sansBoldItalic' }}>
            {'Mobile stocks observation system'}
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          {
            isFetched
            ? <ListView
              dataSource={this.dataSource.cloneWithRows(destructed)}
              renderRow={(rowData) => this._renderRow(rowData)} />
            : null
          }

        </View>
      </View>
    );
  }
}

