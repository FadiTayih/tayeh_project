import { combineReducers } from 'redux';
import testReducer from '../../features/sandbox/testReducer';
import offerReducer from '../../features/offerReducer';
import modalReducer from '../common/modals/modalReducer';
import authReducer from '../../features/auth/authReducer';
import asyncReducer from '../async/asyncReducer';
import ProfileReducer from '../../features/profiles/ProfileReducer';

const rootReducer = combineReducers({
  test: testReducer,
  offer: offerReducer,
  modal: modalReducer,
  auth: authReducer,
  async: asyncReducer,
  profile: ProfileReducer,
});

export default rootReducer;
