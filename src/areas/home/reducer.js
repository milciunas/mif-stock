import {
  FETCH_YAHOO_FINANCE
} from './actions';

const INITIAL_STATE = {
  finance: {
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
    case `${FETCH_YAHOO_FINANCE}_PENDING`:
      return INITIAL_STATE;
    case `${FETCH_YAHOO_FINANCE}_FULFILLED`:
      return {
        finance: {
          data: action.payload,
          isFetched: true,
          error: {
            on: false,
            message: null
          }
        }
      };
    case `${FETCH_YAHOO_FINANCE}_REJECTED`:
      return {
        finance: {
          data: [],
          isFetched: true,
          error: {
            on: true,
            message: 'Error fetching Yahoo Finance'
          }
        }
      };
    default:
      return state;
  }
};
