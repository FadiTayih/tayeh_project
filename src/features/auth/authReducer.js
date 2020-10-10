import { SIGN_IN_USER, SIGN_OUT_USER } from './authConst';

const initialState = {
  authenicated: false,
  currentUser: null,
};

export default function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SIGN_IN_USER:
      return {
        ...state,
        authenicated: true,
        currentUser: {
          email: payload.email,
          photoURL: payload.photoURL,
          uid: payload.uid,
          displayName: payload.displayName,
          providerId: payload.providerData[0].providerId
        },
      };
    case SIGN_OUT_USER:
      return {
        ...state,
        authenicated: false,
        currentUser: null,
      };
    default:
      return state;
  }
}
