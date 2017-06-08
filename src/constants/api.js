import axios from 'axios';
import { Platform } from 'react-native';

let url;

// Cause of genymotion we need to change the url here
// http://stackoverflow.com/questions/5528850/how-to-connect-localhost-in-android-emulator
if (Platform.OS !== 'ios') {
  url = 'http://10.0.3.2:5000/api';
} else {
  url = 'http://localhost:3000/api';
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
const searchString2 = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22YHOO%22%20and%20startDate%20%3D%20%222009-09-11%22%20and%20endDate%20%3D%20%222010-03-10%22&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';

const companies = [
  _symWrap('YHOO'),
  _symWrap('AAPL'),
  _symWrap('MSFT'),
  _symWrap('CSCO'),
  _symWrap('NOK'),
  _symWrap('GOOG'),
  _symWrap('BCS'),
  _symWrap('ORCL'),
  _symWrap('EBAY'),
  _symWrap('HMC'),
  _symWrap('LYG'),
  _symWrap('BABA'),
  _symWrap('NVDA'),
  _symWrap('DRWI'),
  _symWrap('USO'),
  _symWrap('BAC')
];

function _mapCompanies(data) {
  for (let i = 0; i < data.count; i++) {
    return data[i];
  }
}

const mappedCompanies = (_mapCompanies, companies);
const format = '&format=json';
const env = '&env=store';
const where = '%3A%2F%2Fdatatables.org%2FFalltableswithkeys&callback=';

const financeUrl = `${baseUrl}${searchString}(${mappedCompanies})&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=`;

console.log('FINANCE URL: ', financeUrl);

// 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22YHOO%22,%22AAPL%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='

export const fetchYahooFinance = () =>
  fetch(financeUrl)
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
