export const INCREMENT_DATA = 'INCREMENT_DATA';
export const DECREMENT_DATA = 'DECREMENT_DATA';

const InitialState = {
  data: 42,
};

export function increment(amount) {
  return {
    type: INCREMENT_DATA,
    payload: amount,
  };
}

export function decrement(amount) {
  return {
    type: DECREMENT_DATA,
    payload: amount,
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
