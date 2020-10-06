import React from 'react';
import { Grid } from 'semantic-ui-react';
import OfferDetailedHeader from './OfferDetailedHeader';
import OfferDetailedInfo from './OfferDetailedInfo';
import OfferDetailedChat from './OfferDetailedChat';
import OfferDetailedSideBar from './OfferDetailedSideBar';
import { useSelector } from 'react-redux';

export default function OfferDetailPage({ match }) {
  // offer is the name of reducer, offers is the name of the state,
  // find the id from the url params and match it with id in the redux store
  const offer = useSelector((state) =>
    state.offer.offers.find((e) => e.id === match.params.id)
  );
  return (
    <Grid>
      <Grid.Column width={10}>
        <OfferDetailedHeader offer={offer} />
        <OfferDetailedInfo offer={offer} />
        <OfferDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <OfferDetailedSideBar interested={offer.interested} />
      </Grid.Column>
    </Grid>
  );
}
