import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Moment from 'moment';
import EStyleSheet from 'react-native-extended-stylesheet';
import styled from 'styled-components/native';

import { connect } from 'react-redux';
import { fetchHistoricalData } from './actions';

import Chart from './ChartScreen';
import { LoadingScreen } from '../common';
import Colors from '../../constants/Colors';

const now = new Date();
const nowTime = Moment(now).format('HH:mm:ss');
const todayDate = Moment(now).format('YYYY-MM-DD');
const weekFromToday = Moment().subtract(7, 'd').format('YYYY-MM-DD');
const monthFromToday = Moment().subtract(1, 'month').format('YYYY-MM-DD');
const threeMonthsFromToday = Moment().subtract(3, 'month').format('YYYY-MM-DD');
const yearFromToday = Moment().subtract(1, 'year').format('YYYY-MM-DD');

let active = 'week';

@connect(
  state => ({
    historicalData: state.stockDetails.historicalData
  }),
  { fetchHistoricalData })
class StockDetailsScreen extends Component {
  componentDidMount() {
    const { params: stock } = this.props.navigation.state;

    this.props.fetchHistoricalData(stock.symbol, weekFromToday, todayDate);
  }

  MapHistoricalData(data) {
    const result = data.map((item) => ({
      symbol: item[0],
      date: item[1],
      open: item[2],
      high: item[3],
      low: item[4],
      close: item[5]
    }));
    return result;
  }

  ChangeChart(stock, date, today, activate) {
    active = activate;
    return this.props.fetchHistoricalData(stock.symbol, date, today);
  }

  render() {
    const activeStyle = 'rgba(27,154,170, 1)';
    const inactiveStyle = 'rgba(0, 0, 0, 0.1)';

    const { params: stock } = this.props.navigation.state;
    const {
      historicalData: {
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
    const historicalData = this.MapHistoricalData(data);

    return (
      <View style={{ backgroundColor: Colors.alabasterColor, flex: 1 }}>
        <View style={styles.topContainer}>
          <Text style={{ fontFamily: 'sansBold', fontSize: 18, color: Colors.alabasterColor }}>
            {`${stock.name}`}{` (${stock.symbol})`}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <FontAwesome
              name="clock-o"
              size={16}
              color="white"
              style={{ alignSelf: 'center' }} />
            <Text style={{ paddingLeft: 5, color: Colors.alabasterColor }}>{nowTime}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => { this.ChangeChart(stock, monthFromToday, todayDate, 'week'); }}>
            <Text style={{ textAlign: 'center' }}>Week</Text>
            {
              active === 'week' ?
                <View style={{ borderColor: activeStyle, borderBottomWidth: 1, width: '90%', alignSelf: 'center' }} />
              :
                <View style={{ borderColor: inactiveStyle, borderBottomWidth: 1, width: '90%', alignSelf: 'center' }} />
            }
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => { this.ChangeChart(stock, monthFromToday, todayDate, 'month'); }}>
            <Text style={{ textAlign: 'center' }}>Month</Text>
            {
              active === 'month' ?
                <View style={{ borderColor: activeStyle, borderBottomWidth: 1, width: '90%', alignSelf: 'center' }} />
              :
                <View style={{ borderColor: inactiveStyle, borderBottomWidth: 1, width: '90%', alignSelf: 'center' }} />
            }
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => { this.ChangeChart(stock, threeMonthsFromToday, todayDate, 'threeMonths'); }}>
            <Text style={{ textAlign: 'center' }}>3 Months</Text>
            {
              active === 'threeMonths' ?
                <View style={{ borderColor: activeStyle, borderBottomWidth: 1, width: '90%', alignSelf: 'center' }} />
              :
                <View style={{ borderColor: inactiveStyle, borderBottomWidth: 1, width: '90%', alignSelf: 'center' }} />
            }
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => { this.ChangeChart(stock, yearFromToday, todayDate, 'year'); }}>
            <Text style={{ textAlign: 'center' }}>Year</Text>
            {
              active === 'year' ?
                <View style={{ borderColor: activeStyle, borderBottomWidth: 1, width: '90%', alignSelf: 'center' }} />
              :
                <View style={{ borderColor: inactiveStyle, borderBottomWidth: 1, width: '90%', alignSelf: 'center' }} />
            }
          </TouchableOpacity>
        </View>
        <Chart
          data={historicalData}
          height={200} />
        <ScrollView>
          {
            stock.bid || stock.ask ?
              <View>
                <StocksContainer style={{ paddingTop: 10 }}>
                  <Column>
                    <Text>Bid/Ask</Text>
                  </Column>
                  <Column>
                    <Text>{`${stock.bid}`}/{`${stock.ask}`}</Text>
                  </Column>
                </StocksContainer>
                <View style={styles.separator} />
              </View>
            : null
          }
          {
            stock.daysRange ?
              <View>
                <StocksContainer>
                  <Column>
                    <Text>Day's range</Text>
                  </Column>
                  <Column>
                    <Text>{`${stock.daysRange}`}</Text>
                  </Column>
                </StocksContainer>
                <View style={styles.separator} />
              </View>
            : null
          }
          {
            stock.open ?
              <View>
                <StocksContainer>
                  <Column>
                    <Text>Open</Text>
                  </Column>
                  <Column>
                    <Text>{`${stock.open}`}</Text>
                  </Column>
                </StocksContainer>
                <View style={styles.separator} />
              </View>
            : null
          }
          {
            stock.volume ?
              <View>
                <StocksContainer>
                  <Column>
                    <Text>Volume</Text>
                  </Column>
                  <Column>
                    <Text>{`${stock.volume}`}</Text>
                  </Column>
                </StocksContainer>
                <View style={styles.separator} />
              </View>
            : null
          }
          {
            stock.volumeAvg ?
              <View>
                <StocksContainer>
                  <Column>
                    <Text>Average Vol.</Text>
                  </Column>
                  <Column>
                    <Text>{`${stock.volumeAvg}`}</Text>
                  </Column>
                </StocksContainer>
                <View style={styles.separator} />
              </View>
            : null
          }
          {
            stock.marketCap ?
              <View>
                <StocksContainer>
                  <Column>
                    <Text>Market Cap</Text>
                  </Column>
                  <Column>
                    <Text>{`${stock.marketCap}`}</Text>
                  </Column>
                </StocksContainer>
                <View style={styles.separator} />
              </View>
            : null
          }
          {
            stock.peRatio ?
            <View>
              <StocksContainer>
                <Column>
                  <Text>P/E Ratio</Text>
                </Column>
                <Column>
                  <Text>{`${stock.peRatio}`}</Text>
                </Column>
              </StocksContainer>
              <View style={styles.separator} />
            </View>
            : null
          }
          {
            stock.dividendYield ?
              <View>
                <StocksContainer>
                  <Column>
                    <Text>Dividend (Yield)</Text>
                  </Column>
                  <Column>
                    <Text>{`${stock.dividendYield}`}</Text>
                  </Column>
                </StocksContainer>
                <View style={styles.separator} />
              </View>
            : null
          }
        </ScrollView>
      </View>
    );
  }
}

export default StockDetailsScreen;

const Column = styled.View`
  flexDirection: column;
`;

const StocksContainer = styled.View`
  flexDirection: row;
  alignItems: center;
  justifyContent: space-between;
  paddingTop: 5;
  paddingLeft: 10;
  paddingRight: 10;
`;

const styles = EStyleSheet.create({
  stocksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10
  },
  separator: {
    height: 1,
    backgroundColor: '$blackColor',
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    opacity: 0.1
  },
  topContainer: {
    height: 50,
    backgroundColor: Colors.platinumColor,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2
  }
});
