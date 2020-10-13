import {
  CREATE_OFFER,
  UPDATE_OFFER,
  DELETE_OFFER,
  FETCH_OFFERs,
  LISTEN_To_OFFER_CHAT,
  CLEAR_COMMENTS,
} from './offerConst';

const initialState = {
  offers: [],
  comments: [],
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
    case LISTEN_To_OFFER_CHAT:
      return {
        ...state,
        comments: payload,
      };
    case CLEAR_COMMENTS:
      return {
        ...state,
        comments: [],
      };
    default:
      return state;
  }
}
