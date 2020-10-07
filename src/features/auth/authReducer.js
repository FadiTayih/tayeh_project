import { SIGN_IN_USER, SIGN_OUT_USER } from './authConst';

const initialState = {
  authenicated: true,
  currentUser: {
    email: 'bob@gmail.com',
    photoURL: '/assests/images/user.png',
  },
};

export default function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SIGN_IN_USER:
      return {
        ...state,
        authenicated: true,
        currentUser: {
          email: payload.email,
          photoURL: '/assests/images/user.png',
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
