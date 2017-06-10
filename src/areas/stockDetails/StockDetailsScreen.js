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

@connect(
  state => ({
    historicalData: state.stockDetails.historicalData
  }),
  { fetchHistoricalData })
class StockDetailsScreen extends Component {

  componentDidMount() {
    const { params: stock } = this.props.navigation.state;
    const hStartDate = '2017-06-01';

    this.props.fetchHistoricalData(stock.symbol, hStartDate, todayDate);
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

  ChangeChart() {

  }

  render() {
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
          <Text style={{ fontFamily: 'sansBold', fontSize: 16, color: Colors.alabasterColor }}>
            {`${stock.name}`}{` (${stock.symbol})`}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <FontAwesome
              name="clock-o"
              size={16}
              color="green"
              style={{ alignSelf: 'center' }} />
            <Text style={{ paddingLeft: 5, color: Colors.alabasterColor }}>{nowTime}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={this.ChangeChart(todayDate, todayDate)}>
            <Text style={{ textAlign: 'center' }}>Week</Text>
            <View style={{ borderColor: 'rgba(27,154,170, 1)', borderBottomWidth: 1, width: '90%', alignSelf: 'center' }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {}}>
            <Text style={{ textAlign: 'center' }}>Month</Text>
            <View style={{ borderColor: 'rgba(0, 0, 0, 0.1)', borderBottomWidth: 1, width: '90%', alignSelf: 'center' }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {}}>
            <Text style={{ textAlign: 'center' }}>Year</Text>
            <View style={{ borderColor: 'rgba(0,0,0, 0.1)', borderBottomWidth: 1, width: '90%', alignSelf: 'center' }} />
          </TouchableOpacity>
        </View>
        <Chart
          data={historicalData}
          height={200} />
        <ScrollView>
          <StocksContainer style={{ paddingTop: 10 }}>
            <Column>
              <Text>Bid/Ask</Text>
            </Column>
            <Column>
              <Text>{`${stock.bid}`}/{`${stock.ask}`}</Text>
            </Column>
          </StocksContainer>
          <View style={styles.separator} />

          <StocksContainer>
            <Column>
              <Text>Day's range</Text>
            </Column>
            <Column>
              <Text>{`${stock.daysRange}`}</Text>
            </Column>
          </StocksContainer>
          <View style={styles.separator} />

          <StocksContainer>
            <Column>
              <Text>Open</Text>
            </Column>
            <Column>
              <Text>{`${stock.open}`}</Text>
            </Column>
          </StocksContainer>
          <View style={styles.separator} />

          <StocksContainer>
            <Column>
              <Text>Volume</Text>
            </Column>
            <Column>
              <Text>{`${stock.volume}`}</Text>
            </Column>
          </StocksContainer>
          <View style={styles.separator} />

          <StocksContainer>
            <Column>
              <Text>Average Vol.</Text>
            </Column>
            <Column>
              <Text>{`${stock.volumeAvg}`}</Text>
            </Column>
          </StocksContainer>
          <View style={styles.separator} />

          <StocksContainer>
            <Column>
              <Text>Market Cap</Text>
            </Column>
            <Column>
              <Text>{`${stock.marketCap}`}</Text>
            </Column>
          </StocksContainer>
          <View style={styles.separator} />

          <StocksContainer>
            <Column>
              <Text>P/E Ratio</Text>
            </Column>
            <Column>
              <Text>{`${stock.peRatio}`}</Text>
            </Column>
          </StocksContainer>
          <View style={styles.separator} />

          <StocksContainer>
            <Column>
              <Text>Dividend (Yield)</Text>
            </Column>
            <Column>
              <Text>{`${stock.dividendYield}`}</Text>
            </Column>
          </StocksContainer>
          <View style={styles.separator} />
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
