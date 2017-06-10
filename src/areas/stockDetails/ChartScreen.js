import React, { Component } from 'react';
import ChartView from 'react-native-highcharts';

import Colors from '../../constants/Colors';

export default class HomeScreenPure extends Component {
  render() {
    const data = this.props.data;
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
        enabled: false
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
        name: 'AAPL',
        tooltip: {
          valueDecimals: 2
        },
        data: (function () {
          const prices = [];
          data.forEach((element) => {
            prices.push([element.open]);
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
