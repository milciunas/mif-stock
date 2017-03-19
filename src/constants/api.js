export const fetchStocks = () =>
  fetch('http://192.168.0.102:5000/api/stocks')
    .then(res => res.json())
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
      // ADD THIS THROW error
      throw error;
    });
