import * as API from '../../constants/Api';

export const FETCH_YAHOO_FINANCE = 'FETCH_YAHOO_FINANCE';

export const fetchYahooFinance = () => ({
  type: FETCH_YAHOO_FINANCE,
  payload: API.fetchYahooFinance()
});
