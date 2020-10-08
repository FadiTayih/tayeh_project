import React from 'react';
import { Grid } from 'semantic-ui-react';
import OfferDetailedHeader from './OfferDetailedHeader';
import OfferDetailedInfo from './OfferDetailedInfo';
import OfferDetailedChat from './OfferDetailedChat';
import OfferDetailedSideBar from './OfferDetailedSideBar';
import { useDispatch, useSelector } from 'react-redux';
import useFireStoreDoc from '../../../app/hooks/useFireStoreDoc';
import { listentoOfferFromFireBase } from '../../../app/firebase/fireBaseService';
import { listenToOffers } from '../../offerActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Redirect } from 'react-router-dom';

export default function OfferDetailPage({ match }) {
  // check if the offer is in redux store
  // find the id from the url params and match it with id in the redux store
  const offer = useSelector((state) =>
    state.offer.offers.find((e) => e.id === match.params.id)
  );

  const { loading, error } = useSelector((state) => state.async);

  const dispatch = useDispatch();

  //  custom hooks to get document from fireStore, if the redux store
  // does not have the offer
  useFireStoreDoc({
    query: () => listentoOfferFromFireBase(match.params.id),
    data: (offer) => dispatch(listenToOffers([offer])),
    deps: [match.params.id, dispatch],
  });

  // check if is it loading or no error or offer exist
  if (loading || (!offer && !error))
    return <LoadingComponent content='Loading Offers....' />;

  // if there is an error
  if (error) return <Redirect to='/errors' />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <OfferDetailedHeader offer={offer} />
        <OfferDetailedInfo offer={offer} />
        <OfferDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <OfferDetailedSideBar interested={offer?.interested} />
      </Grid.Column>
    </Grid>
  );
}
