import * as API from '../../constants/Api';

export const FETCH_HISTORICAL_DATA = 'FETCH_HISTORICAL_DATA';

export const fetchHistoricalData = (ticker, startDate, endDate) => ({
  type: FETCH_HISTORICAL_DATA,
  payload: API.fetchHictoricalData(
    ticker,
    startDate,
    endDate
  )
});
