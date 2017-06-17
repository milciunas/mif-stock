import axios from 'axios';
import { Platform } from 'react-native';

let url;

if (Platform.OS !== 'ios') {
  url = 'http://10.0.3.2:5000/api';
} else {
  url = 'http://localhost:5000/api';
}

axios.defaults.baseURL = url;

export const fetchStocks = () =>
  fetch('http://192.168.145.2:5000/api/stocks')
    .then(res => res.json())
    .catch((error) => {
      console.log(`LAUNCH MONGO DB IN PROGRAM FILES, mongod --dbpath E:/Projects/MongoDB. ALSO CHECK IF IPCONFIG DID NOT CHANGE ${error.message}`);
      throw error;
    });

function _symWrap(symbol) {
  return `%22${symbol}%22`;
}

const baseUrl = 'https://query.yahooapis.com/v1/public/yql?';
const searchString = 'q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20';

const companies = [
  _symWrap('YHOO'),
  _symWrap('AAPL'),
  _symWrap('MSFT'),
  _symWrap('GOOGL'),
  _symWrap('ORCL'),
  _symWrap('EBAY'),
  _symWrap('NVDA'),
  _symWrap('USO'),
  _symWrap('BAC'),
  _symWrap('CSCO')
];

function _mapCompanies(data) {
  for (let i = 0; i < data.count; i++) {
    return data[i];
  }
}

const mappedCompanies = (_mapCompanies, companies);

const financeUrl = `${baseUrl}${searchString}(${mappedCompanies})&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=`;

export const fetchYahooFinance = () =>
  fetch(financeUrl)
    .then(res => res.json())
    .catch((error) => {
      console.log(`Cant fetch google finances, check if url is correct!!!${error.message}`);
      throw error;
    });

export const fetchYahooFinanceSingle = (ticker) =>
  fetch(`${baseUrl}${searchString}('${ticker}')&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=`)
    .then(res => res.json())
    .catch((error) => {
      console.log(`Cant fetch google finances, check if url is correct!!!${error.message}`);
      throw error;
    });

class UserApi {
  constructor() {
    this.path = '/users';
  }

  async login(args) {
    try {
      const { data } = await axios.post(`${this.path}/auth0`, args);
      return data;
    } catch (e) {
      throw e;
    }
  }
}

export const User = new UserApi();

function _getHistoricalData(ticker, startDate, endDate) {
  return `https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?api_key=3FgcfULPHqr-9KT-Ke-a&ticker=${ticker}&date.gte=${startDate}&date.lte=${endDate}`;
}

export const fetchHictoricalData = (ticker, startDate, endDate) =>
  fetch(_getHistoricalData(ticker, startDate, endDate))
    .then(res => res.json())
    .catch((error) => {
      console.log(`Problem while fetching historical url: ${error.message}`);
      throw error;
    });

const currencyRateUrl = 'http://www.bankofcanada.ca/valet/observations/group/FX_RATES_DAILY';

export function fetchRates(callback) {
  return fetch(currencyRateUrl)
    .then((response) => response.json())
    .then((responseJson) => {
      const { seriesDetail, observations } = responseJson;
      const latestObservations = observations[observations.length - 1];
      delete latestObservations.d;
      const rates = new Map();
      rates.set('CAD', {
        rate: 1,
        code: 'CAD'
      });
      Object.keys(latestObservations).forEach((key) => {
        const code = seriesDetail[key].label.replace('/CAD', '');
        rates.set(code, {
          rate: latestObservations[key].v,
          code
        });
      });

      callback(rates);
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}
