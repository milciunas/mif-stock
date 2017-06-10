import {
  FETCH_HISTORICAL_DATA
} from './actions';

const INITIAL_STATE = {
  historicalData: {
    data: [],
    isFetched: false,
    error: {
      on: false,
      message: null
    }
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `${FETCH_HISTORICAL_DATA}_PENDING`:
      return INITIAL_STATE;
    case `${FETCH_HISTORICAL_DATA}_FULFILLED`:
      return {
        historicalData: {
          data: action.payload.datatable.data,
          isFetched: true,
          error: {
            on: false,
            message: null
          }
        }
      };
    case `${FETCH_HISTORICAL_DATA}_REJECTED`:
      return {
        historicalData: {
          data: [],
          isFetched: true,
          error: {
            on: true,
            message: 'Error while fetching historical data'
          }
        }
      };
    default:
      return state;
  }
};
