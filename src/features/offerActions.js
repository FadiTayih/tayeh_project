import {
  CREATE_OFFER,
  DELETE_OFFER,
  FETCH_OFFERs,
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
