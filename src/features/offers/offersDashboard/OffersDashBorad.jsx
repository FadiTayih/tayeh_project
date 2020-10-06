import React, { useState } from 'react';
import OfferList from './OfferList';

import { Grid, GridColumn } from 'semantic-ui-react';
import { sampleData } from './../../../app/api/SampleData';

// OfferDashBoared is the parent component of OfferList (Child), sample Data is pasted to OfferList
export default function OffersDashBorad() {
  // past the sample data as offer to other components
  const [offers, setOffers] = useState(sampleData);

  // // create a new offer
  // function handleCreateOffer(offer) {
  //   setOffers([...offers, offer]);
  // }

  // // update the offer
  // function handleUpdateOffer(updatedOffer) {
  //   setOffers(
  //     offers.map((offer) =>
  //       offer.id === updatedOffer.id ? updatedOffer : offer
  //     )
  //   );
  // }

  // delete an offer
  function handleDeleteOffer(offerId) {
    setOffers(offers.filter((offer) => offer.id !== offerId));
  }

  return (
    <Grid>
      <GridColumn width={10}>
        <OfferList offers={offers} deleteOffer={handleDeleteOffer} />
      </GridColumn>
      <GridColumn width={6}>
        <h2>Offer Filter</h2>
      </GridColumn>
    </Grid>
  );
}
