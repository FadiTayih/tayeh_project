import React from 'react';
import { Grid } from 'semantic-ui-react';
import OfferDetailedHeader from './OfferDetailedHeader';
import OfferDetailedInfo from './OfferDetailedInfo';
import OfferDetailedChat from './OfferDetailedChat';
import OfferDetailedSideBar from './OfferDetailedSideBar';

export default function OfferDetailPage() {
  return (
    <Grid>
      <Grid.Column width={10}>
        <OfferDetailedHeader />
        <OfferDetailedInfo />
        <OfferDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <OfferDetailedSideBar />
      </Grid.Column>
    </Grid>
  );
}
