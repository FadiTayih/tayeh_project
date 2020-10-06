import React from 'react';
import OfferList from './OfferList';

import { Grid, GridColumn } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

export default function OffersDashBorad() {
  // offers is the name of the state, offer is the name of the reducer
  const { offers } = useSelector((state) => state.offer);

  return (
    <Grid>
      <GridColumn width={10}>
        <OfferList offers={offers} />
      </GridColumn>
      <GridColumn width={6}>
        <h2>Offer Filter</h2>
      </GridColumn>
    </Grid>
  );
}
