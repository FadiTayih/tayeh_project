import {
  aysncActionError,
  aysncActionFinish,
  aysncActionStart,
} from '../../app/async/asyncReducer';

import { delay } from '../../app/common/util/util';
import { toast } from 'react-toastify';

export const INCREMENT_DATA = 'INCREMENT_DATA';
export const DECREMENT_DATA = 'DECREMENT_DATA';

const InitialState = {
  data: 42,
};

// redux thunk allows us to return a function inside of another function
// rather than returning a plain object
export function increment(amount) {
  return async function (dispatch) {
    dispatch(aysncActionStart());
    try {
      await delay(1000);
      dispatch({ type: INCREMENT_DATA, payload: amount });
      dispatch(aysncActionFinish());
    } catch (error) {
      dispatch(aysncActionError(error));
      toast.error(error);
    }
  };
}

export function decrement(amount) {
  return async function (dispatch) {
    dispatch(aysncActionStart());
    try {
      await delay(1000);
      dispatch({ type: DECREMENT_DATA, payload: amount });
      dispatch(aysncActionFinish());
    } catch (error) {
      dispatch(aysncActionError(error));
    }
  };
}

export default function testReducer(state = InitialState, action) {
  switch (action.type) {
    case INCREMENT_DATA:
      return {
        ...state,
        data: state.data + action.payload,
      };

    case DECREMENT_DATA:
      return {
        ...state,
        data: state.data - action.payload,
      };

    default:
      return state;
  }
}
