import React from 'react';
import OfferList from './OfferList';
import OfferListItemoPlaceHolder from './OfferListItemPlaceHolder';

import { Grid, GridColumn } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

import OfferFilter from './OfferFilter';

export default function OffersDashBorad() {
  // offers is the name of the state, offer is the name of the reducer
  const { offers } = useSelector((state) => state.offer);

  // get the loading state from redux
  const { loading } = useSelector((state) => state.async);

  return (
    <Grid>
      <GridColumn width={10}>
        {loading && (
          <>
            <OfferListItemoPlaceHolder />
            <OfferListItemoPlaceHolder />
          </>
        )}
        <OfferList offers={offers} />
      </GridColumn>
      <GridColumn width={6}>
        <OfferFilter />
      </GridColumn>
    </Grid>
  );
}
