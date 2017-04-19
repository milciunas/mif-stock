export const fetchStocks = () =>
  fetch('http://192.168.145.2:5000/api/stocks')
    .then(res => res.json())
    .catch((error) => {
      console.log('LAUNCH MONGO DB IN PROGRAM FILES, mongod --dbpath E:/Projects/MongoDB. ALSO CHECK IF IPCONFIG DID NOT CHANGE ' + error.message);
      // ADD THIS THROW error
      throw error;
    });

export const fetchYahooFinance = () =>
  fetch('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22YHOO%22,%22AAPL%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=')
    .then(res => res.json())
    .catch((error) => {
      console.log('Cant fetch google finances, check if url is correct!!!' + error.message);
      throw error;
    });
