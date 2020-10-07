import { combineReducers } from 'redux';
import testReducer from '../../features/sandbox/testReducer';
import offerReducer from '../../features/offerReducer';
import modalReducer from '../common/modals/modalReducer';
import authReducer from '../../features/auth/authReducer';

const rootReducer = combineReducers({
  test: testReducer,
  offer: offerReducer,
  modal: modalReducer,
  auth: authReducer,
});

export default rootReducer;
