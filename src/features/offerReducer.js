import { sampleData } from '../app/api/SampleData';
import {
  CREATE_OFFER,
  UPDATE_OFFER,
  DELETE_OFFER,
  FETCH_OFFERs,
} from './offerConst';

const initialState = {
  offers: [],
};

export default function offerReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CREATE_OFFER:
      return {
        ...state,
        offers: [...state.offers, payload],
      };
    case UPDATE_OFFER:
      return {
        ...state,
        offers: [
          ...state.offers.filter((offer) => offer.id !== payload.id),
          payload,
        ],
      };
    case DELETE_OFFER:
      return {
        ...state,
        offers: [...state.offers.filter((offer) => offer.id !== payload)],
      };
    case FETCH_OFFERs:
      return {
        ...state,
        offers: payload,
      };
    default:
      return state;
  }
}
