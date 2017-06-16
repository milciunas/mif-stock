import React, { Component } from 'react';
import { Icon } from 'native-base';
import {
  Text,
  View,
  ListView,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

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
    this.state = {
      refreshing: false
    };

    this.dataSource = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
  }

  componentDidMount() {
    this.props.fetchYahooFinance();
    this.fetchSingleStocks('');
  }

  async fetchSingleStocks(ticker) {
    try {
      const response = await fetch(`http://d.yimg.com/aq/autoc?query=${ticker}&region=US&lang=en-US`);
      const responseJson = await response.json();
      this.setState({ searchResults: responseJson.ResultSet.Result });
    } catch (error) {
      console.error(error);
    }
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
    return stocks;
  }

  _renderRow(rowData) {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flexDirection: 'column' }}>
        <TouchableOpacity onPress={() => navigate('StockDetails', rowData)}>
          <View style={styles.stocksContainer}>
              <View style={{ flex: 0.4 }}>
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
              <View style={{ flex: 0.3, paddingLeft: 70 }}>
                <Text>{`Price: ${rowData.lastPrice}`}</Text>
                {
                  rowData.change.includes('-') ?
                    <Text style={{ color: 'red' }}>{`${rowData.change}`}{`(${rowData.changeInPercent})`}</Text>
                  :
                    <Text style={{ color: 'green' }}>{`${rowData.change}`}{`(${rowData.changeInPercent})`}</Text>
                }
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
        data
      }
    } = this.props;
    const destructed = this.MapStocks(data);

    return (
      <View style={styles.root}>
        <View style={styles.topContainer}>
          <View style={{ flexDirection: 'row' }}>
              <Text
                style={styles.titleText}>
                {'Stocks Observation'}
              </Text>
              <TouchableOpacity
                onPress={() => this._onRefresh()}
                style={{ flex: 1 }}>
                <Icon
                  name="refresh"
                  style={{
                    fontSize: 30,
                    color: Colors.whiteColor,
                    alignSelf: 'flex-end',
                    padding: 15
                  }} />
              </TouchableOpacity>
            </View>
        </View>
        <View style={styles.bottomContainer}>
          {
            !isFetched ? <LoadingScreen /> :
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

