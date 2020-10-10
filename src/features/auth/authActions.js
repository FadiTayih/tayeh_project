import { SIGN_IN_USER, SIGN_OUT_USER } from './authConst';
import fireBase from '../../app/config/fireBase';
import { APP_LOADED } from '../../app/async/asyncReducer';

export function signInUser(user) {
  return {
    type: SIGN_IN_USER,
    payload: user,
  };
}

// Check and verify if a user is login in
export function verifyUser() {
  return function (dispatch) {
    // listen if a user loged in/out, it will return a user object
    return fireBase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(signInUser(user));
        dispatch({type: APP_LOADED})
      } else {
        dispatch(signOutUser());
        dispatch({type: APP_LOADED})
      }
    });
  };
}

export function signOutUser() {
  return {
    type: SIGN_OUT_USER,
  };
}
