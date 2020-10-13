import {
  CREATE_OFFER,
  DELETE_OFFER,
  FETCH_OFFERs,
  LISTEN_To_OFFER_CHAT,
  UPDATE_OFFER,
} from './offerConst';
import {
  aysncActionError,
  aysncActionFinish,
  aysncActionStart,
} from '../app/async/asyncReducer';
import { fetchSamples } from '../app/api/mockApi';

export function loadOffers() {
  return async function (dispatch) {
    dispatch(aysncActionStart());
    try {
      const offers = await fetchSamples();
      dispatch({ type: FETCH_OFFERs, payload: offers });
      dispatch(aysncActionFinish());
    } catch (error) {
      dispatch(aysncActionError());
    }
  };
}

// fetching offers from fireStore
export function listenToOffers(offers) {
  return {
    type: FETCH_OFFERs,
    payload: offers,
  };
}

export function createOffer(offer) {
  return {
    type: CREATE_OFFER,
    payload: offer,
  };
}

export function updateOffer(offer) {
  return {
    type: UPDATE_OFFER,
    payload: offer,
  };
}

export function deleteOffer(offerId) {
  return {
    type: DELETE_OFFER,
    payload: offerId,
  };
}

export function listenToOfferChat(comment) {
  return {
    type: LISTEN_To_OFFER_CHAT,
    payload: comment,
  };
}
