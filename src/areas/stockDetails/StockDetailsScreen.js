import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Moment from 'moment';

import EStyleSheet from 'react-native-extended-stylesheet';
import styled from 'styled-components/native';
import Colors from '../../constants/Colors';

class StockDetailsScreen extends Component {
  state = { }
  render() {
    const { params: stock } = this.props.navigation.state;
    const now = new Date();
    const nowMoment = Moment(now).format('HH:mm:ss');
    console.log('NOWWWWWWWWWWWW', nowMoment);
    return (
      <View style={{ backgroundColor: Colors.alabasterColor, flex: 1 }}>
        <ScrollView>
          <View style={styles.topContainer}>
            <Text>{`${stock.name}`}{` (${stock.symbol})`}</Text>
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome
                name="clock-o"
                size={16}
                color="green"
                style={{ alignSelf: 'center' }} />
              <Text style={{ paddingLeft: 5 }}>{nowMoment}</Text>
            </View>
          </View>
          <StocksContainer>
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
    paddingTop: 5,
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
    backgroundColor: '#e8e4d7',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
