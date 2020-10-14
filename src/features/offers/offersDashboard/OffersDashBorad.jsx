import React, { useState } from 'react';
import OfferList from './OfferList';
import OfferListItemoPlaceHolder from './OfferListItemPlaceHolder';

import { Grid, GridColumn } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

import OfferFilter from './OfferFilter';

import { listenToOffersFromFireBase } from '../../../app/firebase/fireBaseService';
import { listenToOffers } from '../../offerActions';

import useFireStoreCollection from '../../../app/hooks/useFireStoreCollections';
import OfferFeeds from './OfferFeeds';

export default function OffersDashBorad() {
  // offers is the name of the state, offer is the name of the reducer
  const { offers } = useSelector((state) => state.offer);

  // get the loading state from redux
  const { loading } = useSelector((state) => state.async);

  // used for filtering offers, set of key value pairs
  const [predicate, setPredicate] = useState(new Map([['filter', 'all']]));

  // check if the user is authenicated
  const { authenicated } = useSelector((state) => state.auth);

  // handle offer filtering
  function handleSetPredicate(key, value) {
    setPredicate(new Map(predicate.set(key, value)));
  }

  const dispatch = useDispatch();

  // Custom hook to get data from fireStore
  useFireStoreCollection({
    query: () => listenToOffersFromFireBase(predicate),
    data: (offers) => dispatch(listenToOffers(offers)),
    deps: [dispatch, predicate],
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
        {authenicated && <OfferFeeds />}
        <OfferFilter
          predicate={predicate}
          setPredicate={handleSetPredicate}
          loading={loading}
        />
      </GridColumn>
    </Grid>
  );
}
