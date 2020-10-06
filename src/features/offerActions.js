import { CREATE_OFFER, DELETE_OFFER, UPDATE_OFFER } from './offerConst';

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
