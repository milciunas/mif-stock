import { combineReducers } from 'redux';
import {
  HomeReducer,
  UserReducer,
  StockDetailsReducer
} from '../areas';
import navigation from '../routes/navigationReducer';

export default combineReducers({
  home: HomeReducer,
  navigation,
  user: UserReducer,
  stockDetails: StockDetailsReducer
});
