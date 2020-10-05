import React, { Fragment } from 'react';
import OfferListItems from './OfferListItems';

// Loop through the prop and past the sample data to OfferListItems component
export default function OfferList({ offers, selectedOffer, deleteOffer }) {
  return (
    <Fragment>
      {offers.map((offer) => (
        <OfferListItems
          offer={offer}
          key={offer.id}
          deleteOffer={deleteOffer}
          selectedOffer={selectedOffer}
        />
      ))}
    </Fragment>
  );
}
