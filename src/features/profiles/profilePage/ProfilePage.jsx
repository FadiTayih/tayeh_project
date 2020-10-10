import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import ProfileContent from './ProfileContent';
import ProfileHeader from './ProfileHeader';
import useFireStoreDoc from '../../../app/hooks/useFireStoreDoc';
import { getUserProfile } from '../../../app/firebase/fireBaseService';
import { ListenToCurrentUserProfile } from '../ProfileActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';

export default function ProfilePage({ match }) {
  const dispatch = useDispatch();
  const { currentUserProfile } = useSelector((state) => state.profile);
  const { loading, error } = useSelector((state) => state.async);

  
  // Custom hook
  useFireStoreDoc({
    query: () => getUserProfile(match.params.id),
    data: (profile) => dispatch(ListenToCurrentUserProfile(profile)),
    deps: [dispatch, match.params.id],
  });

  if ((loading && !currentUserProfile) || (!currentUserProfile && !error)) {
    return <LoadingComponent content='Loading Profile...' />;
  }

  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader profile={currentUserProfile} />
        <ProfileContent profile={currentUserProfile} />
      </Grid.Column>
    </Grid>
  );
}
