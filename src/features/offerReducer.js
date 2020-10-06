import {sampleData} from '../app/api/SampleData';
import { CREATE_OFFER, UPDATE_OFFER, DELETE_OFFER } from './offerConst';

const initialState = {
  offers: sampleData,
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
    default:
      return state;
  }
}
