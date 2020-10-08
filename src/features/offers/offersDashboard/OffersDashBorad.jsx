import React from 'react';
import OfferList from './OfferList';
import OfferListItemoPlaceHolder from './OfferListItemPlaceHolder';

import { Grid, GridColumn } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

import OfferFilter from './OfferFilter';

import { listenToOffersFromFireBase } from '../../../app/firebase/fireBaseService';
import { listenToOffers } from '../../offerActions';

import useFireStoreCollection from '../../../app/hooks/useFireStoreCollections';

export default function OffersDashBorad() {
  // offers is the name of the state, offer is the name of the reducer
  const { offers } = useSelector((state) => state.offer);

  // get the loading state from redux
  const { loading } = useSelector((state) => state.async);

  const dispatch = useDispatch();

  // Custom hook to get data from fireStore
  useFireStoreCollection({
    query: () => listenToOffersFromFireBase(),
    data: (offers) => dispatch(listenToOffers(offers)),
    deps: [dispatch],
  });

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
