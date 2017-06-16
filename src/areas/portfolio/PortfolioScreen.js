import React, { Component } from 'react';
import { Icon } from 'native-base';
import {
  AsyncStorage,
  Alert,
  Text,
  View,
  ListView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import SearchBar from 'react-native-searchbar';
import EStyleSheet from 'react-native-extended-stylesheet';

import { LoadingScreen } from '../common';
import Colors from '../../constants/Colors';

const { width } = Dimensions.get('window');

export default class PortfolioScreenPure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      searchOn: false,
      portfolio: [],
      test: []
    };

    this.dataSource = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
    this.dataPortfolio = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
  }

  componentDidMount() {
    AsyncStorage.getItem('portfolio')
      .then(req => JSON.parse(req))
      .then(json => {
        if (json.length > 0) {
          this.setState({ portfolio: json });
        }
      })
      .catch(error => console.log('No items'));

    this.fetchSingleStocks('');
    this.fetchYahooSingle('');
  }

  async fetchSingleStocks(ticker) {
    try {
      const response = await fetch(`http://d.yimg.com/aq/autoc?query=${ticker}&region=US&lang=en-US`);
      const responseJson = await response.json();
      this.setState({ searchResults: responseJson.ResultSet.Result });
    } catch (error) {
      throw error;
    }
  }

  async fetchYahooSingle(ticker) {
    try {
      const response = await fetch(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22${ticker}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=`);
      const responseJson = await response.json();
      const portfolioState = this.state.portfolio;
      if (responseJson.query.results) {
        if (responseJson.query.results.quote.Ask && responseJson.query.results.quote.Open) {
          let isFound = false;
          for (let i = 0; i < this.state.portfolio.length; i++) {
            if (this.state.portfolio[i].Symbol === responseJson.query.results.quote.Symbol) {
              isFound = true;
            } else {
              isFound = false;
            }
          }

          console.log(isFound);

          if (!isFound) {
            portfolioState.push(responseJson.query.results.quote);
            this.setState({ portfolio: portfolioState });
            this.setState({ test: responseJson.query.results.quote });

            AsyncStorage.setItem('portfolio', JSON.stringify(portfolioState))
              .then(json => console.log('success storing to async storage!'))
              .catch(error => console.log('error storing to async storage!'));
          } else {
            Alert.alert(
              'Attention!',
              'Stock is already in a portfolio',
              [
                { text: 'Dismiss', onPress: () => {} }
              ]
            );
          }
        }
      }
    } catch (error) {
      throw error;
    }
  }

  _renderRow(rowData) {
    return (
        <View style={{ flexDirection: 'column' }}>
          <TouchableOpacity onPress={() => {
            this.setState({ searchOn: false, searchResults: [] });
            this.fetchYahooSingle(rowData.symbol);
          }}>
            <View style={styles.stocksContainer}>
              <Text>{rowData.symbol}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.separator} />
        </View>
    );
  }

  _deleteItem(symbol) {
    const portfolio = this.state.portfolio.filter(
      (item) => {
        if (item.Symbol !== symbol) {
          return item.Symbol;
        }
        return null;
      }
    );

    this.setState({ portfolio });
    AsyncStorage.setItem('portfolio', JSON.stringify(portfolio))
      .then(json => console.log('success storing to async storage!'))
      .catch(error => console.log('error storing to async storage!'));
  }

  _renderRowPortfolio(rowData) {
    const stock = {
      symbol: rowData.Symbol,
      bid: rowData.Bid,
      ask: rowData.Ask,
      changeInPercent: rowData.ChangeinPercent,
      change: rowData.Change,
      currency: rowData.Currency,
      name: rowData.Name,
      lastPrice: rowData.LastTradePriceOnly,
      lastTradeTime: rowData.LastTradeTime,
      daysRange: rowData.DaysRange,
      open: rowData.Open,
      volume: rowData.Volume,
      volumeAvg: rowData.AverageDailyVolume,
      marketCap: rowData.MarketCapitalization,
      peRatio: rowData.PERatio,
      dividendYield: rowData.DividendYield
    };
    const { navigate } = this.props.navigation;
    const searchOn = this.state.searchOn;
    return (
      searchOn ? null :
      <View style={{ flexDirection: 'column' }}>
        <TouchableOpacity
          style={{ height: 50 }}
          onPress={() => navigate('StockDetails', stock)}
          onLongPress={() => this._deleteItem(stock.symbol)}>
          <View style={{ flexDirection: 'row', width, paddingTop: 10 }}>
            <View style={{ flex: 0.4, paddingLeft: 20 }}>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ fontFamily: 'sansBold' }}>{`${stock.name}`}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <FontAwesome
                    name="clock-o"
                    size={16}
                    color="green"
                    style={{ alignSelf: 'center' }} />
                  <Text>{` ${stock.lastTradeTime}`}</Text>
                </View>
              </View>
            </View>
            <View style={{ flex: 0.3, paddingLeft: 70 }}>
              <Text>{`Price: ${stock.lastPrice}`}</Text>
              {
                stock.change.includes('-') ?
                  <Text style={{ color: 'red' }}>{`${stock.change}`}{`(${stock.changeInPercent})`}</Text>
                :
                  <Text style={{ color: 'green' }}>{`${stock.change}`}{`(${stock.changeInPercent})`}</Text>
              }
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>
    );
  }

  render() {
    const searchResults = this.state.searchResults;
    const portfolio = this.state.portfolio;

    return (
      <View style={styles.root}>
        {
          !this.state.searchOn ? null :
            <SearchBar
              placeholder={'YHOO, AAPL, MSFT'}
              data={this.state.searchResults}
              handleSearch={(item) => this.fetchSingleStocks(item)}
              onBack={() => this.setState({ searchOn: false, searchResults: [] })}
              onHide={() => this.setState({ searchOn: false, searchResults: [] })}
              showOnLoad
            />
        }
        {
          this.state.searchResults.length === 0 || !this.state.searchOn ? null :
            <View style={{ paddingTop: 70, backgroundColor: '#fff', minHeight: 50, maxHeight: 180 }}>
              <ListView
                dataSource={this.dataSource.cloneWithRows(searchResults)}
                renderRow={(rowData) => this._renderRow(rowData)}
              />
            </View>
        }
        {
          this.state.searchOn ? null :
            <View style={styles.topContainer}>
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={styles.titleText}>
                  {'Portfolio'}
                </Text>
                <TouchableOpacity
                  onPress={() => this.setState({ searchOn: true })}
                  style={{ flex: 1 }}>
                  <Icon
                    name="add"
                    style={{
                      fontSize: 30,
                      color: Colors.whiteColor,
                      alignSelf: 'flex-end',
                      padding: 13,
                      paddingRight: 15
                    }} />
                </TouchableOpacity>
              </View>
            </View>
        }
        <View style={styles.bottomContainer}>
          {
            portfolio.length === 0
            ?
              <View>
                <Text>Nothing to display.</Text>
                <Text>Please add stocks</Text>
              </View>
            :
              <ListView
                dataSource={this.dataPortfolio.cloneWithRows(portfolio)}
                renderRow={(rowData) => this._renderRowPortfolio(rowData)}
              />
          }
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.alabasterColor
  },
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$platinumColor'
  },
  bottomContainer: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  stocksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 40
  },
  separator: {
    height: 1,
    backgroundColor: '$blackColor',
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    opacity: 0.1
  },
  titleText: {
    paddingRight: 160,
    fontFamily: 'sansBold',
    fontSize: 22,
    alignSelf: 'center',
    textAlign: 'center',
    flex: 1,
    justifyContent: 'center',
    color: Colors.whiteColor
  }
});
