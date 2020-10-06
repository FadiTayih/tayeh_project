import { combineReducers } from 'redux';
import testReducer from '../../features/sandbox/testReducer';
import offerReducer from '../../features/offerReducer';

const rootReducer = combineReducers({
  test: testReducer,
  offer: offerReducer,
});

export default rootReducer;
