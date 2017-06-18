import React, { Component } from 'react';
import ChartView from 'react-native-highcharts';

import Colors from '../../constants/Colors';

export default class HomeScreenPure extends Component {
  render() {
    const data = this.props.data;
    console.log(data);
    const conf = {
      chart: {
        type: 'line',
        marginRight: 10,
        backgroundColor: 'transparent'
      },
      yAxis: {
        title: {
          text: 'Price'
        }
      },
      xAxis: {
        categories: (function () {
          const dates = [];
          data.forEach((element) => {
            dates.push([element.date]);
          }, this);
          return dates;
        }())
      },
      legend: {
        enabled: true
      },
      exporting: {
        enabled: false
      },
      rangeSelector: {
        selected: 1
      },
      title: {
        text: 'Stock Price'
      },
      series: [{
        color: Colors.platinumColor,
        tooltip: {
          valueDecimals: 2
        },
        name: 'High',
        data: (function () {
          const prices = [];
          data.forEach((element) => {
            prices.push([element.high]);
          }, this);
          return prices;
        }())
      },
      {
        color: 'red',
        tooltip: {
          valueDecimals: 2
        },
        name: 'Close',
        data: (function () {
          const prices = [];
          data.forEach((element) => {
            prices.push([element.close]);
          }, this);
          return prices;
        }())
      }]
    };

    return (
      <ChartView
        style={{ height: this.props.height }}
        config={conf} />
    );
  }
}
