import React, { Component } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Text, View, ScrollView } from 'react-native';
// import { fetchYahooFinance } from '../../../constants/Api';

import { Button, Icon } from 'native-base';

import { connect } from 'react-redux';
import { fetchYahooFinance } from '../actions';

import { LoadingScreen } from '../../common';
import Colors from '../../../constants/Colors';
import styles from '../styles/HomeScreen';

@connect(
  state => ({
    finance: state.home.finance
  }),
  { fetchYahooFinance })
export default class HomeScreenPure extends Component {
  // static defaultProps = {
  //   fetchYahooFinance
  // }
  // state = {
  //   loading: false,
  //   stocks: [],
  //   yahooData: []
  // }

  // async componentDidMount() {
  //   this.setState({ loading: true });
  //   const data = await this.props.fetchYahooFinance();
  //   this.setState({ loading: false, yahooData: data.query.results.quote });
  // }

  // MapStocks() {
  //   const temp = [];
  //   const yahooStocks = this.state.yahooData.length < 2
  //     ? this.state.yahooData
  //     : [this.state.yahooData];
  //   return yahooStocks.map((stocks) => {
  //     stocks.forEach((element) => {
  //       temp.push({ symbol: element.symbol, ask: element.Ask });
  //     }, this);
  //     return temp;
  //   });
  // }


  static navigationOptions = {
    headerRight: (
      <View style={{ paddingTop: 20 }}>
        <Button transparent>
          <Icon
            name="search"
            style={{
              fontSize: 30,
              color: Colors.platinumColor
            }}
          />
        </Button>
      </View>
    ),
    tabBarLabel: 'home',
    tabBarIcon: () => (
      <FontAwesome name="home" size={20} />
    )
  }

  componentDidMount() {
    this.props.fetchYahooFinance();
  }

  render() {
    const {
      finance: {
        isFetched,
        // data,
        error
      }
    } = this.props;

    console.log(this.props.finance);



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
    // Using demo data to style frontend, because real api fetching is not finished yet
    return (
      <View style={styles.root}>
        <View style={styles.topContainer}>
          <Text style={{ fontSize: 16, textAlign: 'center', fontFamily: 'sansBoldItalic' }}>
            {'mobile stocks observation system'}
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.titleContainer}>
            <Text style={{ fontSize: 26, fontFamily: 'sansBold' }}>
              {'Stocks'}
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}>
            <View style={styles.rowContainer}>
              <Text style={styles.customFont}>{'Apple: 1.523%'}</Text>
              <View style={styles.separator} />
              <Text style={styles.customFont}>{'Google: 1.52223%'}</Text>
              <View style={styles.separator} />
              <Text style={styles.customFont}>{'Samsung: 2.523%'}</Text>
              <View style={styles.separator} />
              <Text style={styles.customFont}>{'Google: 111.52223%'}</Text>
              <View style={styles.separator} />
              <Text style={styles.customFont}>{'Huawei: 154.52223%'}</Text>
              <View style={styles.separator} />
              <Text style={styles.customFont}>{'Bose: 13.5223%'}</Text>
              <View style={styles.separator} />
              <Text style={styles.customFont}>{'Bose: 13.5223%'}</Text>
              <View style={styles.separator} />
              <Text style={styles.customFont}>{'Bose: 13.5223%'}</Text>
              <View style={styles.separator} />
              <Text style={styles.customFont}>{'Bose: 13.5223%'}</Text>
              <View style={styles.separator} />
              <Text style={styles.customFont}>{'Bose: 13.5223%'}</Text>
              <View style={styles.separator} />
              <Text style={styles.customFont}>{'Bose: 13.5223%'}</Text>
              <View style={styles.separator} />
              <Text style={styles.customFont}>{'Bose: 13.5223%'}</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

